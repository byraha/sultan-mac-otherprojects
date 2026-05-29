import sys
import json
import csv
import time
import requests
import re
from datetime import datetime
from urllib.parse import quote_plus

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}


def scrape_google_jobs(query, location="Remote", max_results=50):
    all_jobs = []

    # Google Jobs search
    q = f"{query} jobs {location}".strip()
    url = f"https://www.google.com/search?q={quote_plus(q)}&ibp=htl;jobs&hl=en"

    print(f"Fetching Google Jobs...")
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        if resp.status_code != 200:
            print(f"  Status {resp.status_code}")
            return []
    except Exception as e:
        print(f"  Error: {e}")
        return []

    if "captcha" in resp.text.lower():
        print("  Blocked by captcha")
        return []

    # Try to extract JSON-LD data
    jsonld_pattern = re.compile(r'<script type="application/ld\+json">(.*?)</script>', re.DOTALL)
    for match in jsonld_pattern.finditer(resp.text):
        try:
            data = json.loads(match.group(1))
            if isinstance(data, dict):
                if data.get("@type") == "ItemList":
                    for item in data.get("itemListElement", []):
                        job = item if isinstance(item, dict) else {}
                        job_data = job.get("item", job)
                        if job_data.get("@type") == "JobPosting":
                            all_jobs.append({
                                "title": job_data.get("title", ""),
                                "company": job_data.get("hiringOrganization", {}).get("name", ""),
                                "location": job_data.get("jobLocation", {}).get("address", {}).get("addressLocality", ""),
                                "description": (job_data.get("description", "") or "")[:300],
                                "link": job_data.get("url", ""),
                                "source": job_data.get("hiringOrganization", {}).get("name", "Google Jobs"),
                            })
        except json.JSONDecodeError:
            continue

    if all_jobs:
        print(f"  Found {len(all_jobs)} jobs from JSON-LD")
        return all_jobs

    # Fallback: parse HTML job cards
    jobs_data = re.search(r'var\s+jobsData\s*=\s*(\[.*?\]);', resp.text, re.DOTALL)
    if jobs_data:
        try:
            jobs_list = json.loads(jobs_data.group(1))
            for job in jobs_list:
                all_jobs.append({
                    "title": job.get("title", ""),
                    "company": job.get("company", ""),
                    "location": job.get("location", location),
                    "description": (job.get("description", "") or "")[:300],
                    "link": job.get("link", ""),
                    "source": "Google Jobs",
                })
            print(f"  Found {len(all_jobs)} jobs from jobsData")
            return all_jobs
        except json.JSONDecodeError:
            pass

    # Fallback: get visible text
    print(f"  No structured data found, page length: {len(resp.text)}")
    return all_jobs


def save_results(jobs, prefix="google_jobs"):
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    json_file = f"{prefix}_{ts}.json"
    csv_file = f"{prefix}_{ts}.csv"

    with open(json_file, "w") as f:
        json.dump(jobs, f, indent=2)
    print(f"\nSaved: {json_file} ({len(jobs)} jobs)")

    if jobs:
        with open(csv_file, "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=jobs[0].keys())
            w.writeheader()
            w.writerows(jobs)
        print(f"Saved: {csv_file}")

    return json_file, csv_file


if __name__ == "__main__":
    query = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else "Windows Senior Administrator L4 MSP"
    print(f"Searching Google Jobs for: {query}")
    jobs = scrape_google_jobs(query, location="Remote")
    if jobs:
        save_results(jobs)
    else:
        print("No jobs found.")

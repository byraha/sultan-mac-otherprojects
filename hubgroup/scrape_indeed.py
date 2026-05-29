import sys
import json
import csv
import time
import requests
from datetime import datetime
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}


def scrape_indeed(query, location="Remote", max_pages=5):
    all_jobs = []
    query_slug = query.replace(" ", "+")

    for page in range(max_pages):
        start = page * 10
        url = f"https://www.indeed.com/jobs?q={query_slug}&l={location}&start={start}"
        if location.lower() == "remote":
            url = f"https://www.indeed.com/jobs?q={query_slug}&sc=0kf%3Aattr%28DSQF7%29%3B&start={start}"

        print(f"[Page {page+1}] Fetching...")
        try:
            resp = requests.get(url, headers=HEADERS, timeout=15)
            if resp.status_code != 200:
                print(f"  Status {resp.status_code}")
                break
        except Exception as e:
            print(f"  Error: {e}")
            break

        soup = BeautifulSoup(resp.text, "lxml")

        cards = soup.select("div.job_seen_beacon, div[data-testid=sliderItem], div.jobsearch-SerpJobCard, div.cardOutline")
        if not cards:
            cards = soup.select("td#resultsCol > div, div.row.result")
        if not cards:
            if "captcha" in resp.text.lower():
                print("  Blocked by captcha")
                break
            print(f"  No job cards found on page {page+1}")
            break

        for card in cards:
            title_el = card.select_one("h2.jobTitle a, a.jobtitle, a[data-jk], a[id^=job_]")
            company_el = card.select_one("span.companyName, span[data-testid=companyname], span.company")
            loc_el = card.select_one("div[data-testid=text-location], div.companyLocation, span.location, div.location")
            desc_el = card.select_one("div.job-snippet, div.summary, span.summary, div.jobsearch-SerpJobCard-summary")
            link_el = title_el

            title = title_el.get_text(strip=True) if title_el else ""
            company = company_el.get_text(strip=True) if company_el else ""
            location_text = loc_el.get_text(strip=True) if loc_el else location
            description = desc_el.get_text(strip=True)[:300] if desc_el else ""

            link = ""
            if link_el and link_el.get("href"):
                href = link_el["href"]
                link = href if href.startswith("http") else f"https://www.indeed.com{href}"
            elif link_el and link_el.get("data-jk"):
                jk = link_el["data-jk"]
                link = f"https://www.indeed.com/viewjob?jk={jk}"

            if not title:
                continue

            all_jobs.append({
                "title": title,
                "company": company,
                "location": location_text,
                "description": description,
                "link": link,
                "source": "Indeed.com",
            })

        print(f"  Got {len(all_jobs)} total jobs")
        time.sleep(1.5)

    return all_jobs


def save_results(jobs, prefix="indeed_jobs"):
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
    print(f"Searching Indeed for: {query}")
    jobs = scrape_indeed(query, location="Remote", max_pages=5)
    if jobs:
        save_results(jobs)
    else:
        print("No jobs found.")

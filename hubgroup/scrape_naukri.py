import sys
import json
import csv
import time
from datetime import datetime
from curl_cffi import requests


def scrape_naukri_api(keyword, location="Remote", max_pages=5):
    all_jobs = []

    for page in range(1, max_pages + 1):
        url = (
            f"https://www.naukri.com/jobapi/v1/search?"
            f"keyword={requests.utils.quote(keyword)}"
            f"&page={page}"
        )
        if location.lower() == "remote":
            url += "&remote=1"

        print(f"[Page {page}] Fetching...")
        try:
            resp = requests.get(url, impersonate="chrome124", timeout=15)
            if resp.status_code != 200:
                print(f"  Status: {resp.status_code}")
                break
        except Exception as e:
            print(f"  Error: {e}")
            break

        try:
            data = resp.json()
        except:
            print("  Invalid JSON response")
            break

        jobs = data.get("list", [])
        if not jobs:
            print("  No more jobs")
            break

        for job in jobs:
            title = job.get("post", "") or ""
            company = job.get("companyName", "") or ""
            location = job.get("CONTCITY", "") or job.get("city", "") or ""
            if not location.strip():
                cf = job.get("cityfield", "")
                location = cf.split("Popular")[0].strip() if "Popular" in cf else cf.strip()
            exp_min = job.get("minExp", "")
            exp_max = job.get("maxExp", "")
            experience = f"{exp_min}-{exp_max} yrs" if exp_min and exp_max else str(exp_min or "")
            salary = job.get("SALARY", "") or ""
            if not salary:
                sal_min = job.get("minSal", 0)
                sal_max = job.get("maxSal", 0)
                if sal_min or sal_max:
                    salary = f"{sal_min}-{sal_max} Lakhs"
            skills = job.get("keywords", "") or ""
            description = (job.get("jobDesc", "") or "")[:300]
            job_url = job.get("urlStr", "") or ""
            if job_url and not job_url.startswith("http"):
                job_url = f"https://www.naukri.com{job_url}"
            posted = job.get("addDate", "") or ""
            emp_type = job.get("employmentType", "") or ""

            if not title and not company:
                continue

            all_jobs.append({
                "title": title,
                "company": company.strip(),
                "location": location.strip(),
                "experience": experience,
                "salary": salary,
                "skills": skills,
                "description": description.strip(),
                "employment_type": emp_type,
                "posted": posted,
                "link": job_url,
                "source": "Naukri.com",
            })

        print(f"  Got {len(jobs)} jobs ({len(all_jobs)} total)")
        time.sleep(1)

    return all_jobs


def save_results(jobs, prefix="naukri_jobs"):
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
    print(f"Searching Naukri for: {query}")
    jobs = scrape_naukri_api(query, location="Remote", max_pages=10)
    if jobs:
        save_results(jobs)
    else:
        print("No jobs found.")

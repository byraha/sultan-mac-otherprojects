terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }
}

provider "google" {
  region = "us-central1"
}

data "google_organization" "org" {
  domain = "simplelinks.co"
}

output "org_id" {
  value = data.google_organization.org.org_id
}

output "org_domain" {
  value = data.google_organization.org.domain
}

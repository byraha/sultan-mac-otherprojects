#!/bin/bash
# Wrapper: sets GCP token, then runs terraform with all arguments
TOKEN=$(gcloud auth print-access-token)
if [ -z "$TOKEN" ]; then
  echo "ERROR: Could not get GCP access token. Run 'gcloud auth login' first."
  exit 1
fi
export GOOGLE_OAUTH_ACCESS_TOKEN="$TOKEN"
exec terraform "$@"

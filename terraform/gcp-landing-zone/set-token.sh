#!/bin/bash
# Source this file before running terraform:
#   source ./set-token.sh
export GOOGLE_OAUTH_ACCESS_TOKEN=$(gcloud auth print-access-token)
echo "GOOGLE_OAUTH_ACCESS_TOKEN set"

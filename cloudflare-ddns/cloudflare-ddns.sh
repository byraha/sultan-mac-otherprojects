#!/bin/bash


# GET PUBLIC IP
IP=$(curl -s https://ipv4.icanhazip.com | tr -d '\n')

echo "Current Public IP: $IP"

# UPDATE DNS RECORD
curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${RECORD_ID}" \
     -H "Authorization: Bearer ${API_TOKEN}" \
     -H "Content-Type: application/json" \
     --data "{\"type\":\"A\",\"name\":\"${DNS_NAME}\",\"content\":\"${IP}\",\"ttl\":120,\"proxied\":false}" | jq

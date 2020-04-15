#!/bin/sh

APIGW=https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/

while sleep 0.5; do curl -w "\n" -s ${APIGW}; done

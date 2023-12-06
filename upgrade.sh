#!/bin/bash

# use crontab, auto upgrade every day
# 0 0 3 * * ? *

# upgrade source codes
git pull origin main

# docker name must be same as in start.sh
container_name="study-notes"

# remove caches
docker stop $container_name
docker rm -f $container_name
docker rmi -f $container_name
echo "old version is removed"

# rebuild image and restart container
docker build . -t $container_name
docker run -dp 443:443 -p 80:80 --name $container_name
echo "new version container is started"

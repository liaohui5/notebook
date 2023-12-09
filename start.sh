#!/bin/bash

container_name="study-notes"

# remove old version
docker stop $container_name
docker rm $container_name
docker rmi $container_name

# build
docker build . -t $container_name

# run
docker run -dp 3000:80 --name $container_name $container_name

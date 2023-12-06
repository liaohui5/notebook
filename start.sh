#!/bin/bash

container_name="study-notes"

docker stop $container_name
docker rm $container_name
docker rmi $container_name

docker build . -t $container_name & docker run -dp 3000:80 --name $container_name $container_name

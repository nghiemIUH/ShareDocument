#!/bin/bash

docker-compose down
docker rmi sharedocument_nginx
docker rmi sharedocument_web

#!/bin/bash

docker compose down
docker volume rm sharedocument_share_volume
docker rmi sharedocument_nginx
docker rmi sharedocument_web
docker rmi sharedocument_frontend

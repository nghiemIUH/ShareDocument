#!/bin/bash

docker compose down
docker volume rm sharedocument_backend_volume
docker volume rm sharedocument_frontend_volume
docker rmi sharedocument_nginx
docker rmi sharedocument_web
docker rmi sharedocument_frontend

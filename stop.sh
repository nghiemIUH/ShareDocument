#!/bin/bash

docker compose down
docker volume rm sharedocument_node
docker volume rm sharedocument_react
docker volume rm sharedocument_django
docker rmi sharedocument_nginx
docker rmi sharedocument_web
docker rmi sharedocument_frontend
docker rmi sharedocument_node

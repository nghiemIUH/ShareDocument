#!/bin/bash
docker pull redis:latest
docker pull postgres:latest
docker pull nghiem0dang/sharedocument_nginx:latest
docker pull nghiem0dang/sharedocument_frontend:latest
docker pull nghiem0dang/sharedocument_web:latest

# 
docker run -d -p 6379:6379 --name redis --network redisnet redis:latest
docker run -e POSTGRES_DB=sharedocument -e POSTGRES_PASSWORD=nghiem@123 \
    -d  -p 5432:5432/tcp --expose 5432 --name db_production\
    -v ../data:/var/lib/postgresql/data postgres:latest
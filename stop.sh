#!/bin/bash
echo '============ stop docker ============'
docker-compose down
echo '============ remove service nginx ============'
docker rmi sharedocument_nginx
echo '============ remove service web ============'
docker rmi sharedocument_web

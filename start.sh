#!/bin/bash
sudo apt install python3-dev libpq-dev -y
docker-compose up -d
docker-compose run web python manage.py migrate
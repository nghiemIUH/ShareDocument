#!/bin/bash
sudo apt install python3-pip
sudo apt install python3-venv
python3 -m venv venv
source venv/bin/activate
pip3 install django
python3 manage.py collectstatic --noinput
docker-compose up --build -d
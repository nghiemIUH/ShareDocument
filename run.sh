#!/bin/bash
echo '============Run collect static file django ============'
source venv/bin/activate
python manage.py collectstatic --noinput
echo '============Run docker ============'
docker-compose up --build -d
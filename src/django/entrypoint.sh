#!/bin/sh

echo "Waiting for Django to be connected to Vault..."
while true; do
    curl -s http://vault:8200/v1/sys/health | grep "initialized" > /dev/null
    if [ $? -eq 0 ]; then
        echo "Django is connected to Vault."
        break
    fi
    sleep 1
done

echo "Starting Django application..."
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000
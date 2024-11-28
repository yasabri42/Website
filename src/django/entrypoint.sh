#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."
while true; do
    PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -d "$POSTGRES_DB" -U "$POSTGRES_USER" -c "SELECT 1;" 2>/dev/null 1>/dev/null
    if [ $? -eq 0 ]; then
        echo "Connected to PostgreSQL database."
        break
    fi
    sleep 1
done

echo "Starting Django application..."
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000
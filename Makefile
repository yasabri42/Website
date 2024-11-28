all: build

build:
	docker-compose up -d --build

migrate:
	docker-compose django python3 manage.py migrate

down:
	docker-compose down

fclean: down
	docker system prune -a -f
	sudo rm -rf ./src/postgresql/data

re: fclean all

PHONY: all build migrate down fclean re
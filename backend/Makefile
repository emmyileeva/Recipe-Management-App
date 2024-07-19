include .env.local

export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1
.DEFAULT_GOAL := build
SUBDIR = .

red = \033[31;1m
green = \033[32;1m
reset = \033[0m

indocker = $(if $(IN_DOCKER), $(1), docker compose exec backend-api.local bash -c '(cd $(SUBDIR) && $(1))')

## spin up the env
build: down
	docker compose build
	docker compose up -d
	$(MAKE) migrate
	$(MAKE) url

## stop container
down:
	docker compose down --remove-orphans

sh:
	docker compose exec backend-api.local bash

sh-db:
	docker exec -it db.local psql --username postgres

migrate:
	$(call indocker, python3 /code/manage.py migrate)

url:
	@ printf 'URLs:\n'
	@ printf 'API:$(green)$(APP_HOST):8000$(reset) Container: $(green)backend-api.local$(reset)\n'
	@ printf 'DB:$(green)$(DB_HOST):$(DB_PORT)$(reset) Container: $(green)db.local$(reset)\n'
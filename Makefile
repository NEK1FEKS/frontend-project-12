lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	npx start-server -s ./frontend/build

run:
	make start-backend & make start-frontend

build:
	rm frontend/build -rf
	npm run build
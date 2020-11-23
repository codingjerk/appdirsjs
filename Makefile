all: lint test dist

dist:
	@./node_modules/.bin/tsc

lint:
	@./node_modules/.bin/eslint src/**/*.ts

test:
	@./node_modules/.bin/jest --coverage

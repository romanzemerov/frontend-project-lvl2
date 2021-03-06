install:
	npm install

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-watch:
	npx -n --experimental-vm-modules jest --watch

pretty:
	npx prettier --write src/**/*.js bin/**/*.js

publish:
	npm publish --dry-run

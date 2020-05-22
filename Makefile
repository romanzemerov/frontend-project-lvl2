install:
	npm install

lint:
	npx eslint .

pretty:
	npx prettier --write src/**/*.js bin/**/*.js

publish:
	npm publish --dry-run

brain-games:
	node bin/brain-games.js

all: node_modules

node_modules: package.json
	npm install
	touch node_modules

tests: node_modules
	node_modules/mocha/bin/mocha test/*.test.js

.PHONY: all tests npm-publish

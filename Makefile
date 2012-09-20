SHELL := /bin/bash

update:
	npm install
	cp node_modules/mocha/mocha.js test/client/lib
	cp node_modules/mocha/mocha.css test/client/lib

dev:
	@grunt build --force
	@NODE_PATH=. \
		NODE_ENV=development \
		supervisor --no-restart-on exit --watch ./src/server ./src/server/index.coffee 

prod:
	@grunt release
	@NODE_PATH=. \
		NODE_ENV=production \
		supervisor ./release/index.coffee

test:
	@make test-client test-server

test-client:
	@NODE_PATH=./build/public/scripts/app \
		NODE_ENV=test \
		mocha -R spec test/client \
		--compilers coffee:coffee-script \
		--recursive \
		--require should

test-server:
	@NODE_PATH=./src/server \
		NODE_ENV=test \
		mocha -R spec test/server \
		--compilers coffee:coffee-script \
		--recursive \
		--require should

cov: 
	@grunt cov
	@make cov-client
	@make cov-server

cov-client:
	
	@jscoverage \
		coverage/build/client/scripts \
		coverage/client
	
	@COVERAGE=1 \
		NODE_ENV=test \
		NODE_PATH=./coverage/client \
		mocha -R html-cov test/client \
		--compilers coffee:coffee-script \
		--recursive \
		--require should \
		> coverage/client.html

cov-server:
	
	@jscoverage \
		coverage/build/server \
		coverage/server
	
	@COVERAGE=1 \
		NODE_ENV=test \
		NODE_PATH=./coverage/server \
		mocha -R html-cov test/server \
		--compilers coffee:coffee-script \
		--recursive \
		--require should \
		> coverage/server.html
		
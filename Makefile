SHELL := /bin/bash

# ----------------------------------------------------------
# APPLICATION
# ----------------------------------------------------------

# Update the application's dependencies

update:
	npm install
	cp node_modules/mocha/mocha.js test/client/lib
	cp node_modules/mocha/mocha.css test/client/lib

# ----------------------------------------------------------
# SERVER
# ----------------------------------------------------------

# Build and start the server in development mode

dev:
	@grunt build --force
	@NODE_PATH=. \
		NODE_ENV=development \
		supervisor --no-restart-on exit --watch ./src/server ./src/server/index.coffee 

# Build and start the server in production mode

prod:
	@grunt release
	@NODE_PATH=. \
		NODE_ENV=production \
		supervisor ./release/index.js

# ----------------------------------------------------------
# TESTS
# ----------------------------------------------------------

# Run unit tests for the client and the server

test:
	@make test-client test-server

# Run unit tests for the client only

test-client:
	@NODE_PATH=./src/client/scripts \
		NODE_ENV=test \
		mocha -R spec spec/client \
		--compilers coffee:coffee-script \
		--recursive \
		--require should

# Run unit tests for the server only

test-server:
	@NODE_PATH=./src/server \
		NODE_ENV=test \
		mocha -R spec spec/server \
		--compilers coffee:coffee-script \
		--recursive \
		--require should

# ----------------------------------------------------------
# TESTS WITH COVERAGE
# ----------------------------------------------------------

# Build the instrumented JavaScript and run unit tests for
# the client and the server

cov: 
	@grunt cov
	@make cov-client
	@make cov-server

# Build the instrumented JavaScript and run unit tests for
# the client

cov-client:

	@jscoverage \
		coverage/build/client/scripts \
		coverage/client
	
	@COVERAGE=1 \
		NODE_ENV=test \
		NODE_PATH=./coverage/client \
		mocha -R html-cov spec/client \
		--compilers coffee:coffee-script \
		--recursive \
		--require should \
		> coverage/client.html

# Build the instrumented JavaScript and run unit tests for
# the server

cov-server:

	@jscoverage \
		coverage/build/server \
		coverage/server
	
	@COVERAGE=1 \
		NODE_ENV=test \
		NODE_PATH=./coverage/server \
		mocha -R html-cov spec/server \
		--compilers coffee:coffee-script \
		--recursive \
		--require should \
		> coverage/server.html
		
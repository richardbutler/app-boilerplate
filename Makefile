#!/bin/bash

SHELL := /bin/bash

#-------------------------------------------------------------------------------
#
# PATHS
#
#-------------------------------------------------------------------------------

#
# Source paths
#

CLIENT_SOURCE_PATH			= "./src/client/scripts"
SERVER_SOURCE_PATH 			= "./src/server"

#
# Spec (test) paths
#

CLIENT_SPEC_PATH			= "./spec/client"
SERVER_SPEC_PATH 			= "./spec/server"

#
# Build paths
#

DEVELOPMENT_BUILD_PATH 		= "./build/dev"
PRODUCTION_BUILD_PATH 		= "./build/prod"

#
# Code coverage paths
#

CLIENT_COVERAGE_PATH		= "./build/coverage/client"
SERVER_COVERAGE_PATH		= "./build/coverage/server"
COVERAGE_TMP_PATH			= "./build/coverage/tmp"
CLIENT_COVERAGE_TMP_PATH	= "./build/coverage/tmp/client"
SERVER_COVERAGE_TMP_PATH	= "./build/coverage/tmp/server"

#
# Options
#

define MOCHA_OPTS
	--compilers coffee:coffee-script \
		--recursive \
		--require should \
		--growl
endef

#-------------------------------------------------------------------------------
#
# APPLICATION
#
#-------------------------------------------------------------------------------

all: install prod-server

#
# Update the application's dependencies
#

install:
	@npm install

#-------------------------------------------------------------------------------
#
# DEVELOPMENT
#
#-------------------------------------------------------------------------------

#
# Runs the grunt 'dev' target, which watches for changes and
# reloads in the browser
#

dev:
	@grunt dev --force

#
# As 'dev' target, but also runs all unit tests.
#

dev-with-tests:
	@grunt dev-with-tests --force

#
# (Experimental) - runs a watch script that will attempt to
# run the corresponding unit test for the changed file.
#
# e.g. Changes to src/server/controllers/default.coffee will
# run the test spec/server/controllers/default.spec.coffee
#

dev-unit:
	@coffee scripts/testwatch.coffee

#-------------------------------------------------------------------------------
#
# SERVER
#
#-------------------------------------------------------------------------------

#
# Build and start the server in development mode
#

dev-server:
	@grunt build
	@make dev-server-run

#
# Just run the development server without a rebuild
#

dev-server-run:
	@NODE_PATH=. \
		NODE_ENV=development \
		supervisor \
		--no-restart-on exit \
		--watch $(SERVER_SOURCE_PATH) \
		$(SERVER_SOURCE_PATH)/index.coffee 

#
# Just release the production code
#

prod:
	@grunt release --force

#
# Build and start the server in production mode
#

prod-server: prod prod-server-run

#
# Just run the production server without a rebuild
#

prod-server-run:
	@NODE_PATH=. \
		NODE_ENV=production \
		supervisor $(PRODUCTION_BUILD_PATH)/index.js

#-------------------------------------------------------------------------------
#
# TESTS
#
#-------------------------------------------------------------------------------

#
# Run unit tests for the client and the server
#

test:
	@make test-client test-server

#
# Run unit tests for the client only
#

test-client:
	@NODE_PATH=$(CLIENT_SOURCE_PATH) \
		NODE_ENV=test \
		mocha -R spec $(CLIENT_SPEC_PATH) \
		$(MOCHA_OPTS) \
		--colors \
		--slow 1000ms

#
# Run unit tests for the server only
#

test-server:
	@NODE_PATH=$(SERVER_SOURCE_PATH) \
		NODE_ENV=test \
		mocha -R spec $(SERVER_SPEC_PATH) \
		$(MOCHA_OPTS) \
		--colors

#-------------------------------------------------------------------------------
#
# TESTS WITH COVERAGE
#
#-------------------------------------------------------------------------------

#
# Build the instrumented JavaScript and run unit tests for
# the client and the server
#

cov: 
	@make cov-server
	@make cov-client
	@rm -r $(COVERAGE_TMP_PATH)

#
# Build the instrumented JavaScript and run unit tests for
# the client
#

cov-client:

	@grunt cov:client

	@if [ -d $(CLIENT_COVERAGE_PATH) ]; then \
		rm -r $(CLIENT_COVERAGE_PATH); \
	fi

	@jscoverage \
		$(CLIENT_COVERAGE_TMP_PATH) \
		$(CLIENT_COVERAGE_PATH)
	
	@COVERAGE=1 \
		NODE_ENV=test \
		NODE_PATH=$(CLIENT_COVERAGE_PATH) \
		mocha -R html-cov $(CLIENT_SPEC_PATH) \
		$(MOCHA_OPTS) \
		> $(CLIENT_COVERAGE_PATH).html

	@rm -r $(CLIENT_COVERAGE_TMP_PATH)/*
	@rmdir $(CLIENT_COVERAGE_TMP_PATH)

#
# Build the instrumented JavaScript and run unit tests for
# the server
#

cov-server:

	@grunt cov:server

	@if [ -d $(SERVER_COVERAGE_PATH) ]; then \
		rm -r $(SERVER_COVERAGE_PATH); \
	fi

	@jscoverage \
		$(SERVER_COVERAGE_TMP_PATH) \
		$(SERVER_COVERAGE_PATH)
	
	@COVERAGE=1 \
		NODE_ENV=test \
		NODE_PATH=$(SERVER_COVERAGE_PATH) \
		mocha -R html-cov $(SERVER_SPEC_PATH) \
		$(MOCHA_OPTS) \
		> $(SERVER_COVERAGE_PATH).html
		
	@rm -r $(SERVER_COVERAGE_TMP_PATH)/*
	@rmdir $(SERVER_COVERAGE_TMP_PATH)
		
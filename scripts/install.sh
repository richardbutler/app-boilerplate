#!/bin/sh

# Install coffee script

if ! which coffee >/dev/null; then
	sudo npm install -g coffee-script
fi

# Install mocha

if ! which mocha >/dev/null; then
	sudo npm install -g mocha
fi

# Install supervisor

if ! which supervisor >/dev/null; then
	sudo npm install -g supervisor
fi

# Install phantom

if ! which phantomjs >/dev/null; then

	# Add /usr/local/src
	[ ! -d /usr/local/src ] && sudo mkdir /usr/local/src

	cd /usr/local/src
	sudo git clone git://github.com/ariya/phantomjs.git
	cd phantomjs
	# Check out branch v1.6
	git checkout 1.6
	chmod +x build.sh
	sudo ./build.sh

	sudo npm install -g phantom
fi
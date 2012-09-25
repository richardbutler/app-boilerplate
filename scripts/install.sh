#!/bin/sh

# Add /usr/local/src
[ ! -d /usr/local/src ] && sudo mkdir /usr/local/src

# Install coffee script

if ! which coffee >/dev/null; then
	sudo npm install -g coffee-script
fi

# Install grunt

if ! which grunt >/dev/null; then
	sudo npm install -g grunt
fi

# Install mocha

if ! which mocha >/dev/null; then
	sudo npm install -g mocha
fi

# Install supervisor

if ! which supervisor >/dev/null; then
	sudo npm install -g supervisor
fi

# Install jscoverage

if ! which jscoverage >/dev/null; then
	cd /usr/local/src
	sudo wget http://siliconforks.com/jscoverage/download/jscoverage-0.5.1.tar.bz2
	sudo tar -xvf jscoverage-0.5.1.tar.bz2
	cd jscoverage-0.5.1
	sudo ./configure
	sudo make && sudo make install
fi

# Install phantom

# No longer required for the moment
exit 0

if ! which phantomjs >/dev/null; then

	cd /usr/local/src
	sudo git clone git://github.com/ariya/phantomjs.git
	cd phantomjs
	# Check out branch v1.6
	git checkout 1.6
	chmod +x build.sh
	sudo ./build.sh

	sudo npm install -g phantom
fi
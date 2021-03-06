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

# Install docco
# Not required - installed locally.
# if ! which docco >/dev/null; then
#	sudo npm install -g docco
# fi

# Install Pygments (for docco)

if ! which pygmentize >/dev/null; then
	cd /usr/local/src
	sudo wget https://bitbucket.org/birkenfeld/pygments-main/get/1.5.tar.gz
	sudo tar -zxvf 1.5.tar.gz
	cd birkenfeld-pygments-main-eff3aee4abff
	sudo python setup.py install
fi

# Install jscoverage

if ! which jscoverage >/dev/null; then
	cd /usr/local/src
	sudo git clone https://github.com/visionmedia/node-jscoverage
	cd node-jscoverage
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
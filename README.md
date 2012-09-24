# Node JS Application boilerplate

## About

The purpose of this project is to lay the foundation to an automated, integrated
build process for projects built on [Node.js](http://nodejs.org). It's built on
[Grunt.js](http://gruntjs.com) and [Make](http://en.wikipedia.org/wiki/Make_(software)).

## TODO

* Get the full build integrated with Jenkins.
* Deploy via Chef or Puppet to a Vagrant VM.

## The process

* Development build
	* CoffeeScript to JavaScript using [Browserify](https://github.com/substack/node-browserify)
	* [Stylus](http://learnboost.github.com/stylus) to CSS
	* [Jade](https://github.com/visionmedia/jade) to HTML
	* Image bundles to spritesheets and CSS
	* CSS concatenation
	* JavaScript concatenation
* Application boilerplate
	* CSS reset via [Normalize.js](http://necolas.github.com/normalize.css)
	* [Twitter Bootstrap](http://twitter.github.com/bootstrap)
	* ECMAScript 5 polyfill
	* [Modernizr](http://modernizr.org) (Configure custom build [here](http://modernizr.com/download))
	* MVC architecture via [Backbone.js](http://backbonejs.org)
	* JavaScript utility belt via [Underscore.js](http://underscorejs.org)
	* More manageable asynchronous programming via [async](http://github.com/caolan/async)
* Standards automation
	* Linting for CoffeeScript
	* Linting for CSS
* Test automation
	* Client-side unit testing via [Mocha](http://visionmedia.github.com/mocha)
	* Server-side unit testing via [Mocha](http://visionmedia.github.com/mocha)
	* Headless integration testing using [Zombie.js](http://zombie.labnotes.org)
	* Code coverage using [jscoverage](http://siliconforks.com/jscoverage)
* Production build
	* CSS minification
	* JavaScript minification and obfuscation

## The Gruntfile

```grunt.js``` and ```grunt.config.js``` are heavily commented with explanation
of the process and goal for each task.

## The Makefile

The Makefile provides a single point of access to all tasks, often wrapping
grunt tasks.

### Installation

```make install```

This will install all the relevant dependencies for this project as outlined in
```package.json```, and through the ```scripts/install.sh``` shell script.

### Development

```make dev```

This will run the ```grunt dev``` target, which watches for changes and reloads
the browser.

```make dev-unit```

(Experimental) - runs a watch script that will attempt to run the corresponding
unit test for the changed file.

e.g. Changes to ```src/server/controllers/default.coffee``` will run the test
```spec/server/controllers/default.spec.coffee```.

### Application deployment

```make dev-server```

Build and start the server in development mode.

```make prod```

Release the production code only.

```make prod-server```

Build and start the server in production mode.

### Testing

```make test```

Run unit tests for the client and the server.

```make test-client```
Run unit tests for the client only.

```make test-server```
Run unit (and integration) tests for the server only.

### Testing with coverage

```make cov```

Build the instrumented JavaScript and run unit tests for the client and the
server. This target will output ```build/coverage/client.html``` and
```build/coverage/client.html```.

```make cov-client```
Build the instrumented JavaScript and run unit tests for the client only. This
target will output ```build/coverage/client.html```.

```make cov-server```
Build the instrumented JavaScript and run unit tests for the server only. This
target will output  ```build/coverage/server.html```.

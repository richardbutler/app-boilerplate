var CLIENT_BUILD_PATH, CLIENT_RELEASE_PATH, CLIENT_SOURCE_PATH, CLIENT_VIEWS_PATH, coffee, connect, express, nib, stylus;

connect = require("connect");

express = require("express");

coffee = require("connect-coffee-script");

stylus = require("stylus");

nib = require("nib");

CLIENT_SOURCE_PATH = "src/client";

CLIENT_VIEWS_PATH = "src/client/views";

CLIENT_BUILD_PATH = "build/public";

CLIENT_RELEASE_PATH = "release/public";

module.exports = function(app) {
  var setupDevelopmentEnvironment;
  setupDevelopmentEnvironment = function() {
    app.use(coffee({
      src: CLIENT_SOURCE_PATH,
      dest: CLIENT_BUILD_PATH,
      bare: true
    }));
    app.use(stylus.middleware({
      src: CLIENT_SOURCE_PATH,
      dest: CLIENT_BUILD_PATH,
      compile: function(str, path) {
        return stylus(str).set("filename", path).set("warn", true).set("compress", false).use(nib());
      }
    }));
    return app.use(express["static"](CLIENT_BUILD_PATH));
  };
  app.configure("development", function() {
    setupDevelopmentEnvironment();
    app.use(express.logger("development"));
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });
  app.configure("test", function() {
    return setupDevelopmentEnvironment();
  });
  app.configure("production", function() {
    app.use(express["static"](CLIENT_RELEASE_PATH));
    return app.use(connect.compress());
  });
  app.configure(function() {
    app.set("view engine", "jade");
    app.set("views", CLIENT_VIEWS_PATH);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser("your secret here"));
    app.use(express.session());
    return app.use(app.router);
  });
  return app;
};

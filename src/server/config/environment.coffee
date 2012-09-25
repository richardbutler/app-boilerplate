connect     = require "connect"
express     = require "express"
coffee      = require "connect-coffee-script"
stylus      = require "stylus"
nib         = require "nib"
browserify  = require "browserify"

module.exports = ( app ) ->
  
  #-----------------------------------------------------------------------------
  #
  # Environment constants
  #
  #-----------------------------------------------------------------------------
  
  CLIENT_SOURCE_PATH      = "src/client"
  CLIENT_VIEWS_PATH       = "src/client/views"
  CLIENT_BUILD_PATH       = "build/dev/public"
  CLIENT_RELEASE_PATH     = "build/prod/public"
  
  #-----------------------------------------------------------------------------
  #
  # Common development and test configuration
  #
  #-----------------------------------------------------------------------------
  
  setupDevelopmentEnvironment = ->
  
    # Compile coffeescript on the fly
    # app.use coffee
    #  src:  CLIENT_SOURCE_PATH
    #  dest: CLIENT_BUILD_PATH
    #  bare: true
    
    # Compile stylus on the fly
    # app.use stylus.middleware
    #  src:  CLIENT_SOURCE_PATH
    #  dest: CLIENT_BUILD_PATH
    #  compile: ( str, path ) ->
    #    stylus( str )
    #      .set( "filename", path )
    #      .set( "warn", true )
    #      .set( "compress", false )
    #      .use( nib() )
  
    # Browserify coffeescript on the fly
    # app.use browserify(
    #  "#{ CLIENT_SOURCE_PATH }/scripts/app.coffee",
    #  mount: "/scripts/app.js"
    # )
  
    # Serve static assets
    app.use express.static( CLIENT_BUILD_PATH )
  
  #-----------------------------------------------------------------------------
  #
  # Development-only configuration
  #
  #-----------------------------------------------------------------------------
  
  app.configure "development", ->
  
    setupDevelopmentEnvironment()
    
    # Log stuff
    app.use express.logger()
    
    # Dump exceptions
    app.use express.errorHandler
      dumpExceptions: true
      showStack: true
  
  #-----------------------------------------------------------------------------
  #
  # Test-only configuration
  #
  #-----------------------------------------------------------------------------
    
  app.configure "test", ->
  
    setupDevelopmentEnvironment()
  
  #-----------------------------------------------------------------------------
  #
  # Production-only configuration
  #
  #-----------------------------------------------------------------------------
  
  app.configure "production", ->
  
    # Gzip static assets
    app.use connect.compress()
  
    # Serve static assets
    app.use express.static( CLIENT_RELEASE_PATH )
  
  #-----------------------------------------------------------------------------
  #
  # Default cross-environment configuration
  #
  #-----------------------------------------------------------------------------

  app.configure ->
    
    app.set "view engine", "jade"
    app.set "views", CLIENT_VIEWS_PATH
    
    app.use express.favicon()
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use express.cookieParser( "your secret here" )
    app.use express.session()
    
    app.use app.router
  
  return app

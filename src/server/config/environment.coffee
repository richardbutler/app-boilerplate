express     = require "express"
coffee      = require "connect-coffee-script"
stylus      = require "stylus"
nib         = require "nib"

# Environment constants

CLIENT_SOURCE_PATH    = "src/client"
CLIENT_VIEWS_PATH     = "src/client/views"
CLIENT_BUILD_PATH     = "build/public"
CLIENT_RELEASE_PATH   = "release/public"

module.exports = ( app ) ->
      
  # Common development and test configuration
  
  setupDevelopmentEnvironment = ->
  
    # Log stuff
    app.use express.logger( "dev" )
  
    # Compile coffeescript on the fly
    app.use coffee
      src:  CLIENT_SOURCE_PATH
      dest: CLIENT_BUILD_PATH
      bare: true
      
    # Compile stylus on the fly
    app.use stylus.middleware
      src:  CLIENT_SOURCE_PATH
      dest: CLIENT_BUILD_PATH
      compile: ( str, path ) ->
        stylus( str )
          .set( "filename", path )
          .set( "warn", true )
          .set( "compress", false )
          .use( nib() )
  
    # Serve static assets
    app.use express.static( CLIENT_BUILD_PATH )
  
  # Development-only configuration
  
  app.configure "development", ->
  
    setupDevelopmentEnvironment()
    
  # Test-only configuration
    
  app.configure "test", ->
  
    setupDevelopmentEnvironment()
  
  # Production-only configuration
  
  app.configure "production", ->
  
    # Serve static assets
    app.use express.static( CLIENT_RELEASE_PATH )
  
  # Default cross-environment configuration

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
  "use strict"

# Create application

  app = require( "./core/app" )
  log = require( "./core/log" )
  
# Setup controllers

  activeControllers = [
    "default"
  ]

  for controllerName in activeControllers
    require( "./controllers/#{ controllerName }" ).setup( app )

# Start application

  app.listen 3000
  
  log.debug "-- App started on localhost:3000"

# Export for testing

  module.exports = app
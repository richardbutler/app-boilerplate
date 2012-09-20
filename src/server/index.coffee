# Create application

  app = require( "./core/app" )
  
# Setup controllers

  activeControllers = [
    "default"
  ]

  for controllerName in activeControllers
    require( "./controllers/#{ controllerName }" ).setup( app )

# Start application

  app.listen 3000
  console.log "-- App started on localhost:3000"

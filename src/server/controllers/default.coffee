"use strict"

#### Default controller

# Outlines the server-side routes for the application.

class DefaultController
  
  # Sets up the routing paths

  setup: ( app ) ->
  
    app.get "/", @index
    app.get "/api/contacts", @contacts
    app.get "/echo/:message", @echo
      
  # Renders an index file
      
  index: ( req, res ) =>
    
    res.render "index"
  
  # Renders a contacts list
  
  contacts: ( req, res ) =>
  
    res.send [
      { name: "John Smith", title: "Chap" }
      { name: "Steve Evans", title: "Fella" }
    ]
    
  # Returns exactly the message it was sent
    
  echo: ( req, res ) =>
  
    res.send req.params.message
    
module.exports = new DefaultController()
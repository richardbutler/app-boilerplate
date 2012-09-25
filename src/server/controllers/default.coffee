class DefaultController

  setup: ( app ) ->
  
    app.get "/", @index
    app.get "/api/contacts", @contacts
    app.get "/echo/:message", @echo
      
  index: ( req, res ) =>
    
    res.render "index"
    
  contacts: ( req, res ) =>
  
    res.send [
      { name: "John Smith", title: "Chap" }
      { name: "Steve Evans", title: "Fella" }
    ]
    
  echo: ( req, res ) =>
  
    res.send req.params.message
    
module.exports = new DefaultController()
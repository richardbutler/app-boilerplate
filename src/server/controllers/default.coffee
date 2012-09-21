class DefaultController

  setup: ( app ) ->
  
    app.get "/", @index
    app.get "/api/data", @data
    app.get "/echo/:message", @echo
      
  index: ( req, res ) =>
    
    res.render "index"
    
  data: ( req, res ) =>
  
    res.send
      thing: "Stuff"
    
  echo: ( req, res ) =>
  
    res.send req.params.message
    
module.exports = new DefaultController()
class DefaultController

  setup: ( app ) ->
  
    # GET /
    
    app.get "/", @index
    app.get "/api/data", @data
      
  index: ( req, res ) =>
    
    res.render "index"
    
  data: ( req, res ) =>
  
    res.send
      thing: "Stuff"
    
module.exports = new DefaultController()
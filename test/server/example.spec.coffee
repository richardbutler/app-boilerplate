describe "example", ->
  
  describe "params", ->
    it "params message should equal message", ->
      message = "My Message"
      
      params = {}
      params.message = message
      
      params.should.have.property( "message" )
      params.message
        .should.be.a( "string" )
        .and.equal( message )

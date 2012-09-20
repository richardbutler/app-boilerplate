request = require "supertest"

app = require "core/app"

describe "default controller", ->

  controller = require "controllers/default"
  controller.setup app
  
  describe "index", ->
    it "should render index", ( done ) ->
      request( app )
        .get( "/" )
        .expect( "Content-Type", /html/ )
        .expect( 200 )
        .end ( err, res ) ->
          throw err if err
          res.text.should.be.a( "string" )
          done()

  describe "data", ->
    it "should render data", ( done ) ->
      request( app )
        .get( "/api/data" )
        .expect( "Content-Type", /json/ )
        .expect( 200 )
        .end ( err, res ) ->
          throw err if err
          res.body.should.be.a( "object" )
          res.body.thing.should.equal( "Stuff" )
          done()
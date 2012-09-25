request = require "supertest"
should = require "should"

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
          
  describe "index", ->
    it "should be cached on the 2nd request", ( done ) ->
      request( app )
        .get( "/" )
        .end ( err, res ) ->
          throw err if err
          done()

  describe "contacts", ->
    it "should render contacts", ( done ) ->
      request( app )
        .get( "/api/contacts" )
        .expect( "Content-Type", /json/ )
        .expect( 200 )
        .end ( err, res ) ->
          throw err if err
          res.body.length.should.equal( 2 )
          res.body[ 0 ].name.should.be.a( "string" )
          res.body[ 0 ].title.should.be.a( "string" )
          done()
jQuery = require "jquery"
Browser = require "zombie"
browser = new Browser()

app = require "../../src/server"

$ = ( selector ) ->
  jQuery( browser.queryAll( selector ) )

describe "index", ->

  it "visits index", ( done ) ->
    
    browser.visit "http://localhost:3000", ( err, result, statusCode ) ->
      done err if err
      
      $( "title" ).text().should.equal( "Index" )
      $( "h3" ).text().should.equal( "Index" )
      
      done()
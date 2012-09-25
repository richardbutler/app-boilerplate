Browser = require "zombie"
browser = new Browser()
browser.waitFor = 1

$ = null
app = require "../../src/server"

describe "index", ->

  it "visits index", ( done ) ->
    
    browser.visit "http://localhost:3000", ( err, result, statusCode ) ->
      return done new Error( err ) if err
      
    contactsAdded = ( window ) ->
      window.document.querySelector( "ul.contacts li" )
    
    browser.wait contactsAdded, ->
      $ = browser.window.$
      $( "ul.contacts" ).children().length.should.equal( 2 )
      $( "title" ).text().should.equal( "Index" )
      $( "h3" ).text().should.equal( "Index" )
      
      done()
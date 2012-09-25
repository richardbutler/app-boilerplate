maths = require "./util/maths"

$ ->

  console.log "App started, 3 + 4 = #{ maths.add( 3, 4 ) }"
  
  $.getJSON "/api/contacts", ( contacts ) ->
    markup = ""
    
    for contact in contacts
      markup += JST.contact( contact )
    
    $( "ul.contacts" ).append( markup )

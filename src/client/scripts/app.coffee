maths = require "./util/maths"

$ ->

  console.log "App started, 3 + 4 = #{ maths.add( 3, 4 ) }"
  
  $.getJSON "/api/contacts", ( contacts ) ->
    markup = ""
    tmpl = jade.templates.contact
    
    for contact in contacts
      markup += tmpl( contact )
    
    $( "ul.contacts" ).append( markup )

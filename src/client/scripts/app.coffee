maths = require "./util/maths"
e = require "./common/enum"

$ ->
  
  "use strict"

  firstValue = e.FIRST_VALUE
  secondValue = e.SECOND_VALUE
  result = maths.add( firstValue, secondValue )

  console.log "App started, #{ firstValue } + #{ secondValue } = #{ result }"
  
  $.getJSON "/api/contacts", ( contacts ) ->
    markup = ""
    tmpl = jade.templates.contact
    
    for contact in contacts
      markup += tmpl( contact )
    
    $( "ul.contacts" ).append( markup )

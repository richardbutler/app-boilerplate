maths = require "./util/maths"
e = require "./common/enum"

$ ->
  
  "use strict"
  
  # Add the two values together

  firstValue = e.FIRST_VALUE
  secondValue = e.SECOND_VALUE
  result = maths.add( firstValue, secondValue )

  # Spit something at the console

  console.log "App started, #{ firstValue } + #{ secondValue } = #{ result }"
  
  # Get our contacts list from the server
  
  $.getJSON "/api/contacts", ( contacts ) ->
    markup = ""
    tmpl = jade.templates.contact
    
    # Render each contact through the template
    
    for contact in contacts
      markup += tmpl( contact )
    
    # Attach all template code to the contacts list
    
    $( "ul.contacts" ).append( markup )

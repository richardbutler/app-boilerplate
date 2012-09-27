mysql   = require "mysql"
colors  = require "colors"
log     = require "../core/log"

HOST = "localhost"
USER = "root"
PASS = ""

# Get some coloured stuff to write to the console.

buildConsoleOutput = ( time, q, message ) ->
  output = colors.magenta( "SQL [#{ time }ms]" )
  output += " \"#{ q }\""
  output += ": #{ message }" if message
  return output

o =
  
  # Shortcut query for MySQL connection
  
  query: ( q, callback ) ->
  
    startTime = new Date().getTime()
  
    # Setup our connection - make this global, or keep it per-request?
    
    connection = mysql.createConnection
      host     : HOST
      user     : USER
      password : PASS
  
    connection.connect()
    
    connection.query q, ( err, rows, fields ) ->
      endTime = new Date().getTime()
      time = endTime - startTime
      
      if err
        log.error buildConsoleOutput( time, q, err )
        return callback( err )
      
      callback( null, rows[ 0 ], fields )
      
      log.info buildConsoleOutput( time, q, "#{ rows[ 0 ].length } records" )
    
    connection.end()

module.exports = o
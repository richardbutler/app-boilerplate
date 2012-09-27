fs = require "fs"
path = require "path"

env = process.env.NODE_ENV || "development"
file = "log/#{ env }.log"
fileData = fs.readFileSync( file, "UTF-8" )

logs = []
lines = fileData.split( "\n" )

console.log( "#{ lines.length } logs" )

for line in lines
  continue if !line
  log = JSON.parse( line )
  logs.push( log )

console.log( JSON.stringify( logs, null, "  " ) )

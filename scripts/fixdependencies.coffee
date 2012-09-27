fs = require "fs"
path = require "path"

getPackage = ( dir ) ->
  file = path.resolve( dir, "package.json" )
  fileData = fs.readFileSync( file, "UTF-8" )
  return JSON.parse( fileData )

pack = getPackage( "." )

for key in [ "dependencies", "devDependencies" ]

  for dependency of pack[ key ]
  
    # Read the version from each node module and inject it back into the
    # package model.
  
    dir = "node_modules/#{ dependency }"
    dependencyPackage = getPackage( dir )
    version = dependencyPackage.version
    
    if !version
      console.log "Couldn't get version for '#{ dependencyPackage.name }', using '*'."
      version = "*"
    
    pack[ key ][ dependency ] = version

# Write the json back to the package.

fs.writeFileSync( "package.json", JSON.stringify( pack, null, "  " ) )

console.log( "All fixed." )

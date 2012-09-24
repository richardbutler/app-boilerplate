fs = require "fs"
path = require "path"
_ = require "underscore"
exec = require( "child_process" ).exec

separator = path.sep || "/"

runTest = ( specFile ) ->
  
  console.log "Running test: #{ specFile }..."
  
  args = [
    "-R list"
    "--compilers coffee:coffee-script"
    "--require should"
    specFile
  ]
  
  nodePath = path.resolve "src/server"
  command = "NODE_ENV=test NODE_PATH=#{ nodePath } mocha #{ args.join ' ' } --colors"
  
  proc = exec command, ( err, stdout, stderr ) ->
    console.log "ERROR", err if err
    console.log stderr if stderr
    console.log stdout if stdout

watchedFiles = {}

watchFile = ( file ) ->
  #console.log "watch file", file
  if !watchedFiles[ file ]
    fs.watchFile file, ( curr, prev ) ->
      if curr.mtime > prev.mtime
        test file
  watchedFiles[ file ] = true

walk = ( dir ) ->
  list = []
  files = fs.readdirSync dir
  
  for file in files
    file = [ dir, file ].join separator
    if fs.statSync( file ).isDirectory()
      list = list.concat( walk( file ) )
    else
      if file.indexOf( ".coffee" ) >= 0
        list.push file
        
  return list

getFiles = ->
  walk( "src" ).concat( walk( "spec" ) )

test = ( file ) ->
  # console.log "Change detected", file
  return if file.indexOf( ".coffee" ) <= 0
  
  filePath = file.split separator
  filePath[ 0 ] = "spec"
  specFile = filePath.join( separator )
  
  if specFile.indexOf( ".spec.coffee" ) is -1
    specFile = specFile.replace( ".coffee", ".spec.coffee" )
  
  if fs.existsSync specFile
    runTest specFile
  else
    console.log "Test #{ specFile } doesn't exist."

getFiles().forEach( watchFile )

checkForNewFiles = ->
  added = _.difference( getFiles(), Object.keys( watchedFiles ) )
  for filepath in added
    # This file has been added.
    # fileChanged "added", filepath
    # Watch this file.
    watchFile filepath

setInterval checkForNewFiles, 1000

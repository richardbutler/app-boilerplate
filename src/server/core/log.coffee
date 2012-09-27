#### Logging

winston = require 'winston'
path    = require 'path'
fs      = require 'fs'

env = process.env.NODE_ENV || "development"

# Ensure we have a /log directory

if !fs.existsSync( "./log" )
  fs.mkdirSync( "./log" )
  
# Create our logger

logger = new winston.Logger
  levels:
    debug:  0
    info:   1
    warn:   2
    error:  3
    fatal:  4
  colors:
    debug:  'grey'
    info:   'cyan'
    warn:   'yellow'
    error:  'red'
    fatal:  'red'

# Log to file in all environments, but restrict production to logging errors.

logger.add( winston.transports.File,
  filename: path.resolve( "./log/#{ env }.log" )
  level: if env is "production" then "warn" else "debug"
  handleExceptions: true
)

# Only log to console in development

if env is "development"
  logger.add( winston.transports.Console,
    colorize: true
    handleExceptions: true
    level: "debug"
  )

module.exports = logger
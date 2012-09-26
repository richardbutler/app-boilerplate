winston = require 'winston'

env = process.env.NODE_ENV

transports = [
  new winston.transports.File( filename: 'log/#{ env }.log' )
]

# Only log to console in development

if env is "development"
  transports.push( new winston.transports.Console() )

module.exports = new winston.Logger
  transports: transports
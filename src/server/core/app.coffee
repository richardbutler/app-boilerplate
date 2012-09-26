"use strict"

express = require "express"

# Create application - this is kept in a separate module
# to allow it to be required elsewhere, with the safeguard
# that it can only be initialised once

app = express()

# Setup environment
require( "../config/environment" )( app )

module.exports = app
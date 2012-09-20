var app, express;

express = require("express");

app = express();

require("../config/environment")(app);

module.exports = app;

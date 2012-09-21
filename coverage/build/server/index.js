var activeControllers, app, controllerName, _i, _len;

app = require("./core/app");

activeControllers = ["default"];

for (_i = 0, _len = activeControllers.length; _i < _len; _i++) {
  controllerName = activeControllers[_i];
  require("./controllers/" + controllerName).setup(app);
}

app.listen(3000);

if (app.get("env") !== "test") {
  console.log("-- App started on localhost:3000");
}

module.exports = app;

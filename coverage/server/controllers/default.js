/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['controllers/default.js']) {
  _$jscoverage['controllers/default.js'] = [];
  _$jscoverage['controllers/default.js'][1] = 0;
  _$jscoverage['controllers/default.js'][2] = 0;
  _$jscoverage['controllers/default.js'][4] = 0;
  _$jscoverage['controllers/default.js'][6] = 0;
  _$jscoverage['controllers/default.js'][7] = 0;
  _$jscoverage['controllers/default.js'][9] = 0;
  _$jscoverage['controllers/default.js'][11] = 0;
  _$jscoverage['controllers/default.js'][15] = 0;
  _$jscoverage['controllers/default.js'][16] = 0;
  _$jscoverage['controllers/default.js'][17] = 0;
  _$jscoverage['controllers/default.js'][18] = 0;
  _$jscoverage['controllers/default.js'][21] = 0;
  _$jscoverage['controllers/default.js'][22] = 0;
  _$jscoverage['controllers/default.js'][25] = 0;
  _$jscoverage['controllers/default.js'][26] = 0;
  _$jscoverage['controllers/default.js'][31] = 0;
  _$jscoverage['controllers/default.js'][32] = 0;
  _$jscoverage['controllers/default.js'][35] = 0;
  _$jscoverage['controllers/default.js'][39] = 0;
}
_$jscoverage['controllers/default.js'][1]++;
var DefaultController, __bind = (function (fn, me) {
  _$jscoverage['controllers/default.js'][2]++;
  return (function () {
  _$jscoverage['controllers/default.js'][2]++;
  return fn.apply(me, arguments);
});
});
_$jscoverage['controllers/default.js'][4]++;
DefaultController = (function () {
  _$jscoverage['controllers/default.js'][6]++;
  function DefaultController() {
    _$jscoverage['controllers/default.js'][7]++;
    this.echo = __bind(this.echo, this);
    _$jscoverage['controllers/default.js'][9]++;
    this.data = __bind(this.data, this);
    _$jscoverage['controllers/default.js'][11]++;
    this.index = __bind(this.index, this);
}
  _$jscoverage['controllers/default.js'][15]++;
  DefaultController.prototype.setup = (function (app) {
  _$jscoverage['controllers/default.js'][16]++;
  app.get("/", this.index);
  _$jscoverage['controllers/default.js'][17]++;
  app.get("/api/data", this.data);
  _$jscoverage['controllers/default.js'][18]++;
  return app.get("/echo/:message", this.echo);
});
  _$jscoverage['controllers/default.js'][21]++;
  DefaultController.prototype.index = (function (req, res) {
  _$jscoverage['controllers/default.js'][22]++;
  return res.render("index");
});
  _$jscoverage['controllers/default.js'][25]++;
  DefaultController.prototype.data = (function (req, res) {
  _$jscoverage['controllers/default.js'][26]++;
  return res.send({thing: "Stuff"});
});
  _$jscoverage['controllers/default.js'][31]++;
  DefaultController.prototype.echo = (function (req, res) {
  _$jscoverage['controllers/default.js'][32]++;
  return res.send(req.params.message);
});
  _$jscoverage['controllers/default.js'][35]++;
  return DefaultController;
})();
_$jscoverage['controllers/default.js'][39]++;
module.exports = new DefaultController();
_$jscoverage['controllers/default.js'].source = ["var DefaultController,","  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };","","DefaultController = (function() {","","  function DefaultController() {","    this.echo = __bind(this.echo, this);","","    this.data = __bind(this.data, this);","","    this.index = __bind(this.index, this);","","  }","","  DefaultController.prototype.setup = function(app) {","    app.get(\"/\", this.index);","    app.get(\"/api/data\", this.data);","    return app.get(\"/echo/:message\", this.echo);","  };","","  DefaultController.prototype.index = function(req, res) {","    return res.render(\"index\");","  };","","  DefaultController.prototype.data = function(req, res) {","    return res.send({","      thing: \"Stuff\"","    });","  };","","  DefaultController.prototype.echo = function(req, res) {","    return res.send(req.params.message);","  };","","  return DefaultController;","","})();","","module.exports = new DefaultController();"];

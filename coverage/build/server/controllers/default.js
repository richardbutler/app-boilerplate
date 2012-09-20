var DefaultController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

DefaultController = (function() {

  function DefaultController() {
    this.data = __bind(this.data, this);

    this.index = __bind(this.index, this);

  }

  DefaultController.prototype.setup = function(app) {
    app.get("/", this.index);
    return app.get("/api/data", this.data);
  };

  DefaultController.prototype.index = function(req, res) {
    return res.render("index");
  };

  DefaultController.prototype.data = function(req, res) {
    return res.send({
      thing: "Stuff"
    });
  };

  return DefaultController;

})();

module.exports = new DefaultController();

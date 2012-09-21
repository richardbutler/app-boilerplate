var DefaultController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

DefaultController = (function() {

  function DefaultController() {
    this.echo = __bind(this.echo, this);

    this.data = __bind(this.data, this);

    this.index = __bind(this.index, this);

  }

  DefaultController.prototype.setup = function(app) {
    app.get("/", this.index);
    app.get("/api/data", this.data);
    return app.get("/echo/:message", this.echo);
  };

  DefaultController.prototype.index = function(req, res) {
    return res.render("index");
  };

  DefaultController.prototype.data = function(req, res) {
    return res.send({
      thing: "Stuff"
    });
  };

  DefaultController.prototype.echo = function(req, res) {
    return res.send(req.params.message);
  };

  return DefaultController;

})();

module.exports = new DefaultController();

export const Component = (function () {
  // codi del component...
  const Constructor = function (options) {
    this.el = options.el; // referencia del DOM
    this.data = options.data; // estat inicial del compnent
    this.template = options.template; // logica del template
  };

  // renderitza el component
  Constructor.prototype.render = function () {
    const $el = d.querySelector(this.el);
    if (!$el) return;
    $el.innerHTML = this.template(this.data); // opci alternativa "this.getState"
  };

  // Actualitza el state de forma reactiva
  Constructor.prototype.setState = function (obj) {
    for (let key in obj) {
      if (this.data.hasOwnProperty(key)) {
        this.data[key] = obj[key];
      }
    }
    this.render();
  };

  //  obtenir una copia inmutable de l'estat
  Constructor.prototype.getState = function () {
    JSON.parse(JSON.stringify(this.data));
  };
})();

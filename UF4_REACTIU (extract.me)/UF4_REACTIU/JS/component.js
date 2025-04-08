export const component = (function () {
  //Codi del Component...
  const Constructor = function (options) {
    this.el = options.el; //referencia DEL DOM
    this.data = options.data; //estat inicial del component
    this.template = options.template; // la lògica del template
  };

  //Renderitza el component
  Constructor.prototype.render = function () {
    const $el = document.querySelector(this.el);
    if (!$el) return;
    $el.innerHTML = this.template(this.data); //una altra opció alternativa this.template
  };
  //Actualitza l'estat de forma reactiva
  Constructor.prototype.setState = function (obj) {
    for (let key in obj) {
      if (this.data.hasOwnProperty(key)) {
        this.data[key] = obj[key];
      }
    }
    this.render();
  };

  //Obtener una copia Immutable de l'estat del component
  Constructor.prototype.getState = function () {
    console.log(JSON.parse(JSON.stringify(this.data)));

    return JSON.parse(JSON.stringify(this.data));
  };

  //Resetejar estat
  Constructor.prototype.resetState = function (obj) {
    this.data = obj;
    return;
  };
  return Constructor; //return el constructor
})();

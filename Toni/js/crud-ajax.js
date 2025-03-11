const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-title"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

const ajax = (options) => {
  /*faltaria validacions. Options és un objecte*/
  //fem una desestructuració del paràmetre options
  //string,string,object,function,function
  let { url, method, success, error, data } = options;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      //Converteix JSON String a Objecte javascript
      let json = JSON.parse(xhr.responseText);
      success(json); //renderització del codi html
    } else {
      //si no hi ha res a statusText (fem un curtcircuit)
      let message = xhr.statusText || "S'ha produit un error...";
      error(`Error ${xhr.status}: ${message}`);
    }
  });
  xhr.open(method || "GET", url);
  xhr.setRequestHeader("content-type", "application/json;charset=utf-8"); //necessari, sinó, enviarà text en plà. Sinó ho fem no funcionarà.
  xhr.send(JSON.stringify(data)); //d'Objecte Javascrit a JSON String
};

const getAllCoins = () => {
  //no importa l'ordre dels atributs de l'objecte, evidentment.
  ajax({
    //method: "GET",
    url: "http://192.168.1.36:3000/monedes",
    success: (res) => {
      res.forEach((el) => {
        $template.querySelector(".poblacio").textContent = el.poblacio;
        $template.querySelector(".epoca").textContent = el.epoca;
        $template.querySelector(".edit").dataset.id = el.id;
        $template.querySelector(".edit").dataset.poblacio = el.poblacio;
        $template.querySelector(".edit").dataset.epoca = el.epoca;
        $template.querySelector(".delete").dataset.id = el.id;
        let $clone = d.importNode($template, true); //true, amb el contingut
        $fragment.appendChild($clone);
      });
      $table.querySelector("tbody").appendChild($fragment);
    },
    error: (err) => {
      console.error(err);
      $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
    },
    //data: null,
  });
};
//cal cridar la funció al carregar el DOM
d.addEventListener("DOMContentLoaded", getAllCoins);

//delegació d'events al document
d.addEventListener("submit", (e) => {
  if (e.target === $form) {
    //aturem l'execució per defecte de l'event...
    e.preventDefault();
    //si del botó ocult no té valor
    if (!e.target.ide.value) {
      //fem una petició POST (Create)
      ajax({
        url: "http://192.168.1.36:3000/monedes",
        method: "POST",
        success: (res) => location.reload(),
        error: (err) =>
          $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
        data: {
          poblacio: e.target.poblacio.value,
          epoca: e.target.epoca.value,
        },
      });
    } else {
      //PUT (UPDATE)
      //sinó, si l'id del botó ocult té valor...
      //fem una petició PUT (Update. L'id és concatena a la URL
      ajax({
        url: `http://192.168.1.36:3000/monedes/${e.target.ide.value}`,
        method: "PUT",
        success: (res) => location.reload(),
        error: (err) =>
          $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
        data: {
          //id: e.target.ide.value,
          poblacio: e.target.poblacio.value,
          epoca: e.target.epoca.value,
        },
      });
    }
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    $title.textContent = "Editar Moneda";
    $form.poblacio.value = e.target.dataset.poblacio;
    $form.epoca.value = e.target.dataset.epoca;
    $form.ide.value = e.target.dataset.id; //copia l'id al boto hidden
    //$form.id existeix!!! per això li hem posat "ide"
  } else if (e.target.matches(".delete")) {
    ajax({
      url: `http://192.168.1.36:3000/monedes/${e.target.dataset.id}`,
      method: "DELETE",
      success: (res) => location.reload(),
      error: (err) =>
        $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
      data: {},
    });
  }
});

const d = document;
const $table = d.querySelector(".crud-table"),
  $titol = d.querySelector(".crud-title");
const $form = d.querySelector(".crud-form"),
  $template = d.querySelector(".crud-template").content;
const $fragment = d.createDocumentFragment();

const ajax = (options) => {
  let { url, method, success, error, data } = options;
  // Instanciem l'objecte que ens permetra fer busquedes al servidor
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      console.log(json);
      success(json);
    } else {
      let message = xhr.statusText || "S'ha prduit un error...";
      error(`Error ${xhr.status} || ${xhr.message}`);
    }
  });
  xhr.open(method || "GET", url);
  // informar que les dades estaran en format UTF-8  que es una aplicacio JSON
  xhr.setRequestHeader("content-type", "applicaton/json;charset=utf-8");
  xhr.send(JSON.stringify(data));
};

const getTotesMarques = () => {
  ajax({
    url: "http://localhost:3000/MarquesCotxes",
    method: "GET",
    success: (res) => {
      console.log(res);
      res.forEach((element) => {
        $template.querySelector(".marca").textContent = element.marca;
        $template.querySelector(".pais").textContent = element.madeIn;
        $template.querySelector(".edit").dataset.marca = element.marca;
        $template.querySelector(".edit").dataset.madeIn = element.madeIn;
        $template.querySelector(".edit").dataset.id = element.id;
        $template.querySelector(".delete").dataset.id = element.id;
        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });

      $table.querySelector("tbody").appendChild($fragment);
    },
    error: (err) => {
      console.log(err);
      $table.insertAdjacentHTML("afterend", `<p>${err}</p>`);
    },
    data: null,
  });
};

d.addEventListener("DOMContentLoaded", getTotesMarques);

d.addEventListener("click", (e) => {
  console.log("event click");

  if (e.target.matches(".edit")) {
    //    alert("edit");

    $titol.textContent = "Editar Marca cotxes";
    $form.marca.value = e.target.dataset.marca;
    $form.madeIn.value = e.target.dataset.madeIn;
    $form.ide.value = e.target.dataset.id;
  } else if (e.target.matches(".delete")) {
    $titol.textContent = "Eliminar Marca cotxes";
  }
});

const $esborrar = d.querySelector(".delete");

d.addEventListener("click", (e) => {
  console.log(e);
  console.log($esborrar);
  if (e.target === $form) {
    console.log("form");

    // Mirar si l'imput hidden te value
    if (e.target.ide.value) {
      // Actualitzaco
      ajax({
        url: `http://localhost:3000/MarquesCotxes/${e.target.ide.value}`,
        method: "PUT",
        success: () => location.reload(),
        error: (err) => {
          console.log(err);
          $table.insertAdjacentHTML("afterend", `<p>${err}</p>`);
        },
        data: {},
      });
    } else {
      // Alta
    }
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(e);

  if (e.target === $form) {
    console.log("form");

    // Mirar si l'imput hidden te value
    if (e.target.ide.value) {
      // Actualitzaco
      ajax({
        url: `http://localhost:3000/MarquesCotxes/${e.target.ide.value}`,
        method: "PUT",
        success: () => location.reload(),
        error: (err) => {
          console.log(err);
          $table.insertAdjacentHTML("afterend", `<p>${err}</p>`);
        },
        data: {
          marca: e.target.marca.value,
          madeIn: e.target.madeIn.value,
        },
      });
    } else {
      // Alta
    }
  }
});

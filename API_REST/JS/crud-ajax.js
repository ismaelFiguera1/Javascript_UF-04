const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $titol = d.querySelector(".crud-title"),
  $template = d.querySelector(".crud-template").content,
  $fragment = d.createDocumentFragment();
/*s'hauria de donar qualsevol part d'aquest codi */

const ajax = (options) => {
  let { url, method, succes, error, data } = options;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      console.log(json);
      succes(json);
    } else {
      let message = xhr.statusText || "s'ha produit un error";
      error(`Error ${xhr.status}: ${message}`);
    }
  });
  xhr.open(method || "GET", url);
  //informar ue les dades en format UTF-8 ,es una aplicació JSON
  xhr.setRequestHeader("content-type", "application/json");
  xhr.send(JSON.stringify(data));
};
const getTotesmonedes = () => {
  ajax({
    url: "http://localhost:3000/monedes",
    method: "GET",
    succes: (res) => {
      console.log(res);
      res.forEach((el) => {
        $template.querySelector(".poblacio").textContent = el.poblacio;
        $template.querySelector(".epoca").textContent = el.epoca;
        $template.querySelector(".edit").dataset.poblacio = el.poblacio;
        $template.querySelector(".edit").dataset.epoca = el.epoca;
        $template.querySelector(".edit").dataset.id = el.id;
        $template.querySelector(".delete").dataset.id = el.id;
        /*true amb el contingut */
        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $table.querySelector("tbody").appendChild($fragment);
    },
    error: (err) => {
      console.log(err);
      $table.insertAdjacentHTML("afterend", `<p><mark><b>${err}</b><mark></p>`);
    },
    data: {},
  });
};
d.addEventListener("DOMContentLoaded", getTotesmonedes);

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    $titol.textContent = "Editar Moneda";
    $form.poblacio.value = e.target.dataset.poblacio;
    $form.epoca.value = e.target.dataset.epoca;
    /*copia l'id al l'element del formulari hidden ocult*/
    $form.ide.value = e.target.dataset.id;
  } else if (e.target.matches(".delete")) {
    let id = e.target.dataset.id;
    ajax({
      url: `http://localhost:3000/monedes/${id}`,
      method: "DELETE",
      succes: () => location.reload(), //cal executar-lo dins d'una arrow function
      error: (err) => {
        console.log(err);
        $table.insertAdjacentHTML(
          "afterend",
          `<p><mark><b>${err}</b><mark></p>`
        );
      },
      data: {},
    });
  }
});
d.addEventListener("submit", (e) => {
  if (e.target === $form) {
    e.preventDefault();
    //MIRRAR SI TÉS EL ID
    if (e.target.ide.value) {
      //Actualizacio (PUT)
      //al final de la url hem posat l'id
      ajax({
        url: `http://localhost:3000/monedes/${e.target.ide.value}`,
        method: "PUT",
        succes: () => location.reload(),
        error: (err) => {
          console.log(err);
          $table.insertAdjacentHTML(
            "afterend",
            `<p><mark><b>${err}</b><mark></p>`
          );
        },
        data: {
          poblacio: e.target.poblacio.value,
          epoca: e.target.epoca.value,
        },
      });
    } else {
      ajax({
        url: `http://localhost:3000/monedes/`,
        method: "POST",
        succes: () => location.reload(),
        error: (err) => {
          console.log(err);
          $table.insertAdjacentHTML(
            "afterend",
            `<p><mark><b>${err}</b><mark></p>`
          );
        },
        data: {
          poblacio: e.target.poblacio.value,
          epoca: e.target.epoca.value,
        },
      });
    }
  }
});

const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-title"),
  $template = d.querySelector(".crud-template").content,
  $fragment = d.createDocumentFragment();

let headers = {
  "content-type": "application/json;charset=utf-8",
};

const getTotesMonedes = async () => {
  try {
    let res = await axios.get("http://localhost:3000/monedes", headers),
      json = await res.data;
    console.log(json);

    json.forEach((el) => {
      $template.querySelector(".poblacio").textContent = el.poblacio;
      $template.querySelector(".epoca").textContent = el.epoca;
      $template.querySelector(".edit").dataset.poblacio = el.poblacio;
      $template.querySelector(".edit").dataset.epoca = el.epoca;
      $template.querySelector(".edit").dataset.id = el.id;
      $template.querySelector(".delete").dataset.id = el.id;
      let $clone = d.importNode($template, true); //true, amb el contingut
      $fragment.appendChild($clone);
    });
    $table.querySelector("tbody").appendChild($fragment);
  } catch (err) {
    let message = err.statusText || "S'ha produit un error...";
    $table.insertAdjacentHTML(
      "afterend",
      `<p><b><mark>${err.status}:${message}</mark></b></p>`
    );
  }
};
d.addEventListener("DOMContentLoaded", getTotesMonedes);

d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    //alert("edit");
    $title.textContent = "Editar Moneda";
    $form.poblacio.value = e.target.dataset.poblacio;
    $form.epoca.value = e.target.dataset.epoca;
    //copia l'id a l'element del formulari hidden
    $form.ide.value = e.target.dataset.id;
  } else if (e.target.matches(".delete")) {
    let id = e.target.dataset.id;
    try {
      let res = await axios.delete(
        `http://localhost:3000/monedes/${id}`,
        headers
      );
      json = await res.data;
      location.reload();
    } catch (err) {
      let message = err.statusText || "S'ha produit un error...";
      $table.insertAdjacentHTML(
        "afterend",
        `<p><b><mark>${err.status}:${message}</mark></b></p>`
      );
    }
  }
});

d.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (e.target === $form) {
    //Mirar si l'input ocult té valor a l'atribut id
    if (e.target.ide.value) {
      //ACTUALITZACIÓ (PUT)
      try {
        let dades = {
          poblacio: e.target.poblacio.value,
          epoca: e.target.epoca.value,
        };
        let res = await axios.put(
          `http://localhost:3000/monedes/${e.target.ide.value}`,
          dades,
          headers
        );
        json = await res.data;
        location.reload();
      } catch (err) {
        let message = err.statusText || "S'ha produit un error...";
        $table.insertAdjacentHTML(
          "afterend",
          `<p><b><mark>${err.status}:${message}</mark></b></p>`
        );
      }
    } else {
      //ALTA (POST)
      try {
        let dades = {
          poblacio: e.target.poblacio.value,
          epoca: e.target.epoca.value,
        };
        let res = await axios.post(
          `http://localhost:3000/monedes/`,
          dades,
          headers
        );
        json = await res.data;
        location.reload();
      } catch (err) {
        let message = err.statusText || "S'ha produit un error...";
        $table.insertAdjacentHTML(
          "afterend",
          `<p><b><mark>${err.status}:${message}</mark></b></p>`
        );
      }
    }
  }
});

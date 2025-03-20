const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $titol = d.querySelector(".crud-title"),
  $template = d.querySelector(".crud-template").content,
  $fragment = d.createDocumentFragment();

const getTotesmonedes = async () => {
  try {
    let res = await fetch("http://localhost:3000/monedes");
    if (!res.ok) {
      throw { status: res.status, statusText: res.statusText };
    }
    let json = await res.json();
    console.log(json);
    json.forEach((el) => {
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
  } catch (error) {
    let message = error.statusText || "S'ha Produit un error";
    console.log(message);
    $table.insertAdjacentHTML(
      "afterend",
      `<p><mark><b>${err.status}: ${message}</b><mark></p>`
    );
  }
};
d.addEventListener("DOMContentLoaded", getTotesmonedes);

d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    $titol.textContent = "Editar Moneda";
    $form.poblacio.value = e.target.dataset.poblacio;
    $form.epoca.value = e.target.dataset.epoca;
    /*copia l'id al l'element del formulari hidden ocult*/
    $form.ide.value = e.target.dataset.id;
  } else if (e.target.matches(".delete")) {
    let id = e.target.dataset.id;
    try {
      let options = {
        method: "DELETE",
        headers: {
          "content-type": "application/json;charse=utf-8",
        },
      };
      let res = await fetch(`http://localhost:3000/monedes/${id}`, options);
      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }
      location.reload();
    } catch (error) {
      console.log(err);
      $table.insertAdjacentHTML("afterend", `<p><mark><b>${err}</b><mark></p>`);
    }
  }
});

d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    e.preventDefault();
    //MIRRAR SI TÉS EL ID
    if (e.target.ide.value) {
      //Actualizacio (PUT)
      //al final de la url hem posat l'id

      try {
        let data = {
          poblacio: e.target.poblacio.value,
          epoca: e.target.epoca.value,
        };
        let options = {
          method: "PUT",
          headers: {
            "content-type": "application/json;charse=utf-8",
          },
          body: JSON.stringify(data),
        };
        let res = await fetch(
          `http://localhost:3000/monedes/${e.target.ide.value}`,
          options
        );
        if (!res.ok) {
          throw { status: res.status, statusText: res.statusText };
        }
        location.reload();
      } catch (error) {
        console.log(err);
        $table.insertAdjacentHTML(
          "afterend",
          `<p><mark><b>${err}</b><mark></p>`
        );
      }
    } else {
      try {
        let data = {
          poblacio: e.target.poblacio.value,
          epoca: e.target.epoca.value,
        };
        let options = {
          method: "POST",
          headers: {
            "content-type": "application/json;charse=utf-8",
          },
          body: JSON.stringify(data),
        };
        let res = await fetch(`http://localhost:3000/monedes/`, options);
        if (!res.ok) {
          throw { status: res.status, statusText: res.statusText };
        }
        location.reload();
      } catch (error) {
        console.log(err);
        $table.insertAdjacentHTML(
          "afterend",
          `<p><mark><b>${err}</b><mark></p>`
        );
      }
    }
  }
});

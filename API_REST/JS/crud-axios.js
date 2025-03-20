const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $titol = d.querySelector(".crud-title"),
  $template = d.querySelector(".crud-template").content,
  $fragment = d.createDocumentFragment();
let headers = {
  "content-type": "application/json;charse=utf-8",
};
const getTotesmonedes = async () => {
  try {
    let res = await axios.get("http://localhost:3000/monedes");
    let json = res.data;
    console.log(res);
    /* if (!res.ok) {
      throw { status: res.status, statusText: res.statusText };
    }
    
    let json = await res.json();*/
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
      `<p><mark><b>${error.status}: ${message}</b><mark></p>`
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
      let headers = {
        "content-type": "application/json;charse=utf-8",
      };
      let res = await axios.delete(
        `http://localhost:3000/monedes/${id}`,
        headers
      );
      console.log(res);
      location.reload();
    } catch (error) {
      console.log(error);
      $table.insertAdjacentHTML(
        "afterend",
        `<p><mark><b>${error}</b><mark></p>`
      );
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

        /* let options = {
          headers: {
            "content-type": "application/json;charse=utf-8",
          },
          body: JSON.stringify(data),
        };*/
        let res = await axios.put(
          `http://localhost:3000/monedes/${e.target.ide.value}`,
          data,
          headers
        );
        /* if (!res.statusText) {
          throw { status: res.status, statusText: res.statusText };
        }*/
        location.reload();
      } catch (error) {
        console.log(error);
        $table.insertAdjacentHTML(
          "afterend",
          `<p><mark><b>${error}</b><mark></p>`
        );
      }
    } else {
      try {
        let data = {
          poblacio: e.target.poblacio.value,
          epoca: e.target.epoca.value,
        };

        let res = await axios.post(
          `http://localhost:3000/monedes/`,
          data,
          headers
        );
        location.reload();
      } catch (error) {
        console.log(error);
        $table.insertAdjacentHTML(
          "afterend",
          `<p><mark><b>${err}</b><mark></p>`
        );
      }
    }
  }
});

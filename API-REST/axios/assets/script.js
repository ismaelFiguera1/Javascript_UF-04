const d = document,
  $body = d.querySelector("body"),
  $taula = d.querySelector("table"),
  $form = d.querySelector("form");

const getCiutats = async () => {
  try {
    // eslint-disable-next-line no-undef
    let res = await axios.get("http://localhost:3000/Ciutats");
    let json = res.data;
    let $fragment = d.createDocumentFragment();
    json.forEach((element) => {
      let $tr = d.createElement("tr");
      let linea = `        <td>${element.id}</td>
        <td>${element.nom}</td>
        <td>${element.habitants}</td>
        <td><button data-id="${element.id}" data-nom="${element.nom}" data-habitants="${element.habitants}" class="edit">Editar</button></td>
        <td><button class="delete" data-id="${element.id}">Borrar</button></td>`;
      $tr.innerHTML = linea;
      $fragment.appendChild($tr);
    });
    $taula.querySelector("tbody").appendChild($fragment);
  } catch (error) {
    let message =
      error.statusText || "S'ha Produit un error al recuperar les dades";
    $body.insertAdjacentHTML(
      "afterend",
      `<p><mark><b>${error.status}: ${message}</b><mark></p>`
    );
  }
};

d.addEventListener("DOMContentLoaded", getCiutats);

d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    $form.nom.value = e.target.dataset.nom;
    $form.habitants.value = e.target.dataset.habitants;
    $form.id.value = e.target.dataset.id;
  } else if (e.target.matches(".delete")) {
    console.log("borrar");
    try {
      let config = {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      };
      // eslint-disable-next-line no-undef, no-unused-vars
      let res = await axios.delete(
        `http://localhost:3000/Ciutats/${e.target.dataset.id}`,
        config
      );
      location.reload();
    } catch (error) {
      let message =
        error.statusText || "S'ha Produit un error al eliminar un registre";
      $body.insertAdjacentHTML(
        "afterend",
        `<p><mark><b>${error.status}: ${message}</b><mark></p>`
      );
    }
  }
});

d.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (e.target.id.value) {
    console.log("editar");
    try {
      let dades = {
        nom: e.target.nom.value,
        habitants: parseInt(e.target.habitants.value),
      };
      let headers = {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      };
      // eslint-disable-next-line no-undef, no-unused-vars
      let res = await axios.put(
        `http://localhost:3000/Ciutats/${e.target.id.value}`,
        dades,
        headers
      );
      location.reload();
    } catch (error) {
      let message =
        error.statusText || "S'ha Produit un error al editar un registre";
      $body.insertAdjacentHTML(
        "afterend",
        `<p><mark><b>${error.status}: ${message}</b><mark></p>`
      );
    }
  } else {
    console.log("alta");
    //ALTA (POST)
    try {
      let dades = {
        nom: e.target.nom.value,
        habitants: parseInt(e.target.habitants.value), // Als decimals es Number()
      };
      let headers = {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      };
      // eslint-disable-next-line no-undef, no-unused-vars
      let res = await axios.post(
        `http://localhost:3000/Ciutats`,
        dades,
        headers
      );
      location.reload();
    } catch (error) {
      let message =
        error.statusText ||
        "S'ha Produit un error al d'onar d'alta un registre";
      $body.insertAdjacentHTML(
        "afterend",
        `<p><mark><b>${error.status}: ${message}</b><mark></p>`
      );
    }
  }
});

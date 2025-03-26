const d = document,
  $taulaCategories = d.querySelector(".taula_categories"),
  $body = d.querySelector("body"),
  $taulaProductes = d.querySelector(".taula_productes"),
  $form = d.querySelector("form");

d.addEventListener("DOMContentLoaded", async () => {
  try {
    let res = await fetch("http://localhost:3000/categories");
    let resJSON = await res.json();
    let $fragment = d.createDocumentFragment();
    resJSON.forEach((element) => {
      let $tr = d.createElement("tr");
      let linea = `<td>${element.id}</td>
            <td>${element.nom}</td><td>${element.productes}</td>
            <td><button class="edit" data-id=${element.id} data-nom="${element.nom}" data-pro="${element.productes}">Editar</button></td>
            <td><button class="Borrar" data-id=${element.id}>Borrar</button><td>`;
      $tr.innerHTML = linea;
      $fragment.appendChild($tr);
    });
    $taulaCategories.querySelector("tbody").appendChild($fragment);

    res = await fetch("http://localhost:3000/productes");
    resJSON = await res.json();
    $fragment = d.createDocumentFragment();
    resJSON.forEach((element) => {
      let $tr = d.createElement("tr");
      let linea = `                <td>${element.id}</td>
                <td>${element.nom}</td>
                <td>${element.preu}</td>`;
      $tr.innerHTML = linea;
      $fragment.appendChild($tr);
    });
    $taulaProductes.querySelector("tbody").appendChild($fragment);
  } catch (error) {
    let message = error.statusText || "S'ha produit un error";
    $body.insertAdjacentHTML(
      "beforeend",
      `<p><b>${error.status}:${message}</b></p>`
    );
  }
});

d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    console.log(e);

    console.log("editar");
    console.log($form);
    $form.nom.value = e.target.dataset.nom;
    $form.producte.value = e.target.dataset.pro;
    $form.ocult.value = e.target.dataset.id;
  } else if (e.target.matches(".Borrar")) {
    console.log(e.target.dataset.id);
    let id = e.target.dataset.id;
    console.log(id);

    try {
      let options = {
        method: "DELETE",
        headers: {
          "content-type": "application/json;charse=utf-8",
        },
      };
      let res = await fetch(`http://localhost:3000/categories/${id}`, options);
      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }
      location.reload();
    } catch (error) {
      console.log(err);
    }
  }
});

d.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e.target);

  if (e.target.matches("form")) {
    console.log("categories");
    if (e.target.ocult.value) {
      try {
        let data = {
          nom: e.target.nom.value,
          productes: e.target.producte.value,
        };
        let options = {
          method: "PUT",
          headers: {
            "content-type": "application/json;charse=utf-8",
          },
          body: JSON.stringify(data),
        };
        let res = await fetch(
          `http://localhost:3000/categories/${e.target.ocult.value}`,
          options
        );
        if (!res.ok) {
          throw { status: res.status, statusText: res.statusText };
        }
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }
});

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const $body = document.querySelector("body"),
  d = document,
  headerGET = {
    headers: {
      Authorization: "token EL_TEU_TOKEN",
    },
  };

const $template = d.querySelector(".repository"),
  $form = d.querySelector("form");

(async () => {
  try {
    // eslint-disable-next-line no-undef
    let res = await axios.get("https://api.github.com/user/repos", headerGET);
    let json = res.data;
    console.log(json);

    let clonat = $template.content.cloneNode(true);

    let $fragment = d.createDocumentFragment();
    json.forEach((element) => {
      let $tr = d.createElement("tr");
      let celes = `          <td class="ide">${element.id}</td>
          <td class="nom">${element.name}</td>
          <td class="private">${element.private}</td>          
          <td><button class="edit" data-id="${element.id}" data-nom="${element.name}" data-privat="${element.private}">Editar</button></td>
          <td><button class="delete" data-id="${element.name}">Esborrar</button></td>`;
      $tr.insertAdjacentHTML("afterbegin", celes);
      $fragment.appendChild($tr);
    });

    clonat.querySelector("tbody").appendChild($fragment);

    d.querySelector(".taulaRegistres").appendChild(clonat);
  } catch (error) {
    let message =
      error.statusText || "S'ha produit un error al carregar les dades";
    $body.insertAdjacentHTML(
      "beforeend",
      `<p><b>${error.status}:${message}</b></p>`
    );
  }
})();

d.addEventListener("click", async (e) => {
  console.log(e.target);
  if (e.target.matches(".edit")) {
    console.log("editar");
    $form.nomRepository.value = e.target.dataset.nom;
    $form.id.value = e.target.dataset.nom;
  } else if (e.target.matches(".delete")) {
    console.log("esborrar");

    try {
      let config = {
        headers: {
          Authorization: "token EL_TEU_TOKEN",
          "Content-Type": "application/json; charset=utf-8",
        },
      };
      // eslint-disable-next-line no-undef, no-unused-vars
      let res = await axios.delete(
        `https://api.github.com/repos/ismaelFiguera1/${encodeURIComponent(
          e.target.dataset.id
        )}`,
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
  if (e.target == $form) {
    if (e.target.id.value) {
      try {
        let dades = {
          name: e.target.nomRepository.value,
        };

        let headers = {
          headers: {
            Authorization: "token EL_TEU_TOKEN",
            "Content-Type": "application/json;charset=utf-8",
          },
        };

        let res = await axios.patch(
          `https://api.github.com/repos/ismaelFiguera1/${encodeURIComponent(
            e.target.id.value
          )}`,
          dades,
          headers
        );
        location.reload();
      } catch (error) {
        let message =
          error.statusText || "S'ha produit un error al modificar les dades";
        $body.insertAdjacentHTML(
          "beforeend",
          `<p><b>${error.status}:${message}</b></p>`
        );
      }
    } else {
      try {
        let dades = {
          name: e.target.nomRepository.value,
          private: true,
        };
        let headers = {
          headers: {
            Authorization: "token EL_TEU_TOKEN",
            "Content-Type": "application/json;charset=utf-8",
          },
        };

        let res = await axios.post(
          "https://api.github.com/user/repos",
          dades,
          headers
        );

        location.reload();
      } catch (error) {
        let message =
          error.statusText || "S'ha produit un error al modificar les dades";
        $body.insertAdjacentHTML(
          "beforeend",
          `<p><b>${error.status}:${message}</b></p>`
        );
      }
    }
  }
});

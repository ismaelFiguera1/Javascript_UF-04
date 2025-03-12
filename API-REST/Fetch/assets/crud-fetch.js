const d = document;
const $table = d.querySelector(".crud-table"),
  $titol = d.querySelector(".crud-title");
const $form = d.querySelector(".crud-form"),
  $template = d.querySelector(".crud-template").content;
const $fragment = d.createDocumentFragment();

const getTotesMarques = async () => {
  try {
    let res = await fetch("http://localhost:3000/MarquesCotxes");
    if (!res.ok) {
      throw { status: res.status, statusText: res.statusText };
    }
    let json = await res.json();
    console.log(json);

    json.forEach((element) => {
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

    document.addEventListener("submit", async (e) => {
      e.preventDefault();

      console.log(e.target.ide.value);

      if (e.target === $form) {
        // Mirar si l'imput hidden te value
        if (e.target.ide.value) {
          // Actualitzaco

          try {
            let options = {
              method: "PUT",
              header: { "content-type": "applicaton/json;charset=utf-8" },
            };
            body: json.stringify({
              marca: e.target.marca.value,
              madeIn: e.target.madeIn.value,
            });
            let resultat = await fetch(
              `http://localhost:3000/MarquesCotxes/${e.target.ide.value}`,
              options
            );
            if (!res.ok) {
              throw { status: res.status, statusText: res.statusText };
            }
            location.reload();
          } catch (error) {
            let message = error.statusText || "S'ha produit un error";
            $table.insertAdjacentHTML(
              "afterend",
              `<p><b>${error.status}:${message}</b></p>`
            );
          }
        } else {
          try {
            let options = {
              method: "POST",
              header: { "content-type": "applicaton/json;charset=utf-8" },
            };
            body: json.stringify({
              marca: e.target.marca.value,
              madeIn: e.target.madeIn.value,
            });
            let resultat = await fetch(
              `http://localhost:3000/MarquesCotxes/`,
              options
            );
            if (!res.ok) {
              throw { status: res.status, statusText: res.statusText };
            }
            location.reload();
          } catch (error) {
            let message = error.statusText || "S'ha produit un error";
            $table.insertAdjacentHTML(
              "afterend",
              `<p><b>${error.status}:${message}</b></p>`
            );
          }
        }
      }
    });

    d.addEventListener("click", async (e) => {
      console.log(e);
      console.log(e.target.ide.value);
      if (e.target.ide.value) {
      }
    });
  } catch (error) {
    let message = error.statusText || "S'ha produit un error";
    $table.insertAdjacentHTML(
      "afterend",
      `<p><b>${error.status}:${message}</b></p>`
    );
  }
};

d.addEventListener("DOMContentLoaded", getTotesMarques);

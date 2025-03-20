const d = document,
  $body = d.querySelector("body"),
  $form = d.querySelector("form");

const getCotxes = async () => {
  let res = await fetch("http://localhost:3000/MarquesCotxes");
  let marquesJSON = await res.json();
  let $taula = d.createElement("table");
  let $encabezat = `  <tr>
    <th>marca</th>
    <th>madeIn</th>
    <th>id</th>
  </tr>`;
  $taula.insertAdjacentHTML("afterbegin", $encabezat);
  $body.insertAdjacentElement("beforeend", $taula);
  let $fragment = document.createDocumentFragment();
  marquesJSON.forEach((element) => {
    console.log(element);
    let $tr = document.createElement("tr");
    let $linea = `<td>${element.marca}</td><td>${element.madeIn}</td><td>${element.id}</td>        <td>
          <button type="button" class="edit ${element.id}" marca="${element.marca}" madeIn="${element.madeIn}">editar</button>
          <button type="button" class="delete">esborrar</button>
        </td>`;
    $tr.innerHTML = $linea;
    $fragment.appendChild($tr);
  });
  console.log($fragment);
  $taula.querySelector("tbody").appendChild($fragment);
  $taula.classList.add("marques");
  console.log($taula);
};

d.addEventListener("DOMContentLoaded", getCotxes());

const editarMarques = async (e) => {
  try {
    let res = await fetch("http://localhost:3000/MarquesCotxes");
    let marquesJSON = await res.json();
    console.log($form);
    console.log(e.target);

    $form.marca.value = e.target.dataset.marca;
  } catch (error) {
    console.error("error editar marques");
  }
};

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    console.log("editar");
    editarMarques(e);
  } else if (e.target.matches(".delete")) {
    console.log("esborrar");
  }
});

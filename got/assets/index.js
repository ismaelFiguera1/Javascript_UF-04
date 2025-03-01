const d = document;
const $div = d.querySelector(".llista-caracters div");
const $div1 = d.querySelector(".llista-continents div");
//console.log($div);
const $fragment = d.createDocumentFragment();

Promise.all([
  fetch("https://thronesapi.com/api/v2/Characters"),
  fetch("https://thronesapi.com/api/v2/Continents"),
])
  .then((res) => Promise.all(res.map((respostes) => respostes.json())))
  .then((resJSON) => {
    //    console.log(resJSON);
    resJSON[0].forEach((element) => {
      //      console.log(element);
      const $figure = d.createElement("figure");
      const $image = d.createElement("img");
      const $fig = d.createElement("figcaption");

      $image.setAttribute("src", `${element.imageUrl}`);
      $fig.innerHTML = `<span>${element.fullName}</span>`;
      $figure.appendChild($image);
      $figure.appendChild($fig);
      $fragment.appendChild($figure);
    });
    $div.appendChild($fragment);
    const $ul = d.createElement("ul");
    resJSON[1].forEach((element) => {
      //      console.log(element);

      const $li = d.createElement("li");
      $li.innerText = `${element.name}`;
      $ul.appendChild($li);
    });
    $div1.appendChild($ul);
  });

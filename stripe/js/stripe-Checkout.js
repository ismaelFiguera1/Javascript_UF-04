//  https://docs.stripe.com/js
import STRIPEKEYS from "./stripeKeys.js";

const d = document;

const $figure = d.querySelector(".moneda-figure");
const $template = d.querySelector("#monedes-template").content;
const $fragment = d.createDocumentFragment(),
  $section = d.querySelector(".monedes");

const fetchOptions = {
  headers: {
    Authorization: `Bearer ${STRIPEKEYS.private}`,
  },
};

Promise.all([
  fetch("https://api.stripe.com/v1/products", fetchOptions),
  fetch("https://api.stripe.com/v1/prices", fetchOptions),
])
  .then((respostes) => Promise.all(respostes.map((res) => res.json())))
  .then((json) => {
    let products = json[0].data;
    let prices = json[1].data;
    //console.log(products, prices);
    prices.forEach((element) => {
      let productData = products.filter(
        (product) => product.id === element.product
      );
      //console.log(productData);
      $template
        .querySelector(".moneda-figure")
        .setAttribute("data-price", element.id);
      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $section.appendChild($fragment);
  })
  .catch((err) => {
    let message = err.statusText || "error de conexio amb l'api Stripe";
    $section.innerHTML = `<div class="errorConexio">Error ${err.status} ${message}</div>`;
    console.log(err);
  });

/*
fetch("https://api.stripe.com/v1/products", {
  headers: {
    Authorization: `Bearer ${STRIPEKEYS.private}`,
  },
})
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((resJSON) => {
    console.log(resJSON);
  });
*/

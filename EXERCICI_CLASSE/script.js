const $boto = document.querySelector("button");
try {
  const dadesBrut = fetch("https://jsonplaceholder.typicode.com/users");
  console.log(dadesBrut);
} catch (error) {
  let message = error.statusText || "S'ha produit un error";
  $boto.insertAdjacentHTML(
    "afterend",
    `<p><b>${error.status}:${message}</b></p>`
  );
}

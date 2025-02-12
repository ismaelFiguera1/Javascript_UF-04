(() => {
  // primer pas
  const xhr = new XMLHttpRequest(),
    $xhr = document.querySelector("#xhr"),
    $fragment = document.createDocumentFragment();
  //console.log(xhr);
  // segon pas
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState != 4) return;
    // Nomes gestionarem l'estat 4 "Complete"
    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      json.forEach((e) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${e.id} -- ${e.name} -- ${e.username} -- ${e.email}`;
        $fragment.appendChild($li);
      });
      $xhr.appendChild($fragment);
    } else {
      let message = xhr.statusText || "S'ha produit un error";
      $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
    }
  });
  // tercer pas
  xhr.open("GET", "https://jsonplaceholder.typicode.com/use");
  // quart pas
  xhr.send();
})(); /* Aixo en una funcio autoexecutable */

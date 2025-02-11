(() => {
  // primer pas
  const xhr = new XMLHttpRequest(),
    $xhr = document.querySelector("#xhr");
  console.log(xhr);
  // segon pas
  xhr.addEventListener("readystatechange", (e) => {
    console.log(e);
  });
  // tercer pas
  xhr.open("GET", "https://api.github.com/users/ismaelFiguera1");
  // quart pas
  xhr.send();
})(); /* Aixo en una funcio autoexecutable */

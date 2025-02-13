// API Fetch

(() => {
  const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      console.log(res);
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then((json) => {
      console.log(json);

      json.forEach((element) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${element.id} -- ${element.name} -- ${element.username} -- ${element.email}`;
        $fragment.appendChild($li);
      });
      $fetch.appendChild($fragment);
    })
    .catch((err) => {
      console.log("Catch", err);
      let message = err.statusText || "S'ha produit un error";
      $fetch.innerText = message;
    })
    .finally(() => {
      console.log("sempre");
    });
})();

// APIFetc + AsyncAwait

(() => {
  ($fetchAsync = document.getElementById("fetch-async")),
    ($fragment = document.createDocumentFragment());

  async function getUsers() {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/users");
      let json = await res.json();
      console.log(res, json);
    } catch (error) {
    } finally {
    }
  }
})();

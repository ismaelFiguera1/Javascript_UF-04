const $boto = document.querySelector(".boto-posts"),
  d = document,
  $template = d.querySelector(".taulaDades"),
  $body = d.querySelector("body"),
  $taula = $template.content.querySelector("table"),
  $div = d.querySelector(".taula"),
  $fragment = d.createDocumentFragment(),
  $botoUsers = d.querySelector(".boto-users");

let headers = {
  "content-type": "application/json;charset=utf-8",
};

const getPosts = async () => {
  try {
    const postBrut = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        headers
      ),
      postJSON = await postBrut.data;

    $div.appendChild($taula);
    postJSON.forEach((element) => {
      let $tr = document.createElement("tr");
      $tr.innerHTML = `<td>${element.userId}</td><td>${element.id}</td><td>${element.title}</td><td>${element.body}</td>`;
      $fragment.appendChild($tr);
    });

    console.log($fragment);

    $div.querySelector("tbody").appendChild($fragment);
  } catch (error) {
    let message = error.statusText || "S'ha produit un error";
    $body.insertAdjacentHTML(
      "beforeend",
      `<p><b>${error.status}:${message}</b></p>`
    );
  }
};

const getUsers = async () => {
  try {
    const usersBrut = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    console.log(usersBrut);
    const $div = d.createElement("div"),
      $taulaUsers = d.createElement("table"),
      $encabezaments = `        <tr>
          <th>id</th>
          <th>name</th>
          <th>username</th>
          <th>email</th>
        </tr>`,
      $fragment = document.createDocumentFragment();
    $div.classList.add("users");
    $taulaUsers.insertAdjacentHTML("afterbegin", $encabezaments);

    usersBrut.data.forEach((element) => {
      console.log(element);
      let $fila = `      
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.username}</td>
        <td>${element.email}</td>
      `;
      let $tr = document.createElement("tr");
      $tr.innerHTML = $fila;
      $fragment.appendChild($tr);
    });
    console.log($fragment);
    $taulaUsers.querySelector("tbody").appendChild($fragment);
    $div.appendChild($taulaUsers);
    console.log($div);
    $body.insertAdjacentElement("afterbegin", $div);
  } catch (error) {
    let message = error.statusText || "S'ha produit un error";
    $body.insertAdjacentHTML(
      "beforeend",
      `<p><b>${error.status}:${message}</b></p>`
    );
  }
};

d.addEventListener("click", (e) => {
  if (e.target === $boto) {
    getPosts();
  } else if (e.target === $botoUsers) {
    console.log("Users");
    getUsers();
  }
});

const $boto = document.querySelector("button"), d = document, $template = d.querySelector(".taulaDades"), $body=d.querySelector("body"), 
$taula=$template.content.querySelector("table"), $div=d.querySelector(".taula"), $fragment=d.createDocumentFragment();

let headers = {
  "content-type": "application/json;charset=utf-8",
};

const getUsers =  async ()=>{
  try {
    const usersBrut = await axios.get("https://jsonplaceholder.typicode.com/posts", headers), usersJSON = await usersBrut.data;
    console.log(usersBrut);
    console.log(usersJSON);

    $div.appendChild($taula);
    usersJSON.forEach(element => {
      let $tr = document.createElement("tr");
      $tr.innerHTML = `<td>${element.userId}</td><td>${element.id}</td><td>${element.title}</td><td>${element.body}</td>`; 
      $fragment.appendChild($tr);

    });

    console.log($fragment);

    $div.querySelector("tbody").appendChild($fragment);

    console.log(a);
    
    

  } catch (error) {
    let message = error.statusText || "S'ha produit un error";
    $body.insertAdjacentHTML(
      "beforeend",
      `<p><b>${error.status}:${message}</b></p>`
    );
  }

}

d.addEventListener("DOMContentLoaded", getUsers);

d.addEventListener("click",(e)=>{
  console.log(e.target);
    if (e.target == $boto) {
      console.log("boto - dades");
      console.log($template);
      $div.appendChild($taula);
      usersJSON.forEach(element => {
        let $linea = `<tr><td>${element.userId}</td><td>${element.id}</td><td>${element.title}</td><td>${element.body}</td></tr>`
        $fragment.appendChild($linea);
      });
      console.log($fragment);
      
    }
  })
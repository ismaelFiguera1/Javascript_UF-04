import { component } from "./component.js";

let d = document,
  $item = d.getElementById("todo-item");

//fem una instancia del component amb els paramétres :
//el :referencia al elemen DOM
//estat inicial
// lògica el template

const app = new component({
  el: "#todo-list",
  data: {
    todoList: [],
  },
  template: function (estat) {
    if (estat.todoList.length < 1)
      return `<p><em>llista sense tasques</em></p>`;
    //let todos = state.todoList.map((item) => `<li>${item}</li>`).join("");
    let todos = estat.todoList.map((item) => `<li>${item}</li>`).join("");
    return todos;
  },
});

//Entenem que l'estat és una representació de les dades en un moment concret
//modifiquem l'estat i reacciona el componenent renderitzant ek nou estat
app.setState({
  todoList: [
    "Tasca1",
    "Tasca2",
    "Tasca3",
    "Tasca4",
    "Tasca5",
    "Tasca6",
    "Tasca7",
  ],
});

d.addEventListener("submit", (e) => {
  if (!e.target.matches("#to-doform")) {
    return false;
  }
  e.preventDefault(); //afegir l'item al llisa
  if (!$item.value) return;
  //Actualitzar l'estat de forma reactiva
  //Obtener una cópia de l'estat perqué l'estat és immutable
  const laststate = app.getState();
  laststate.todoList.push($item.value);
  app.setState({ todoList: laststate.todoList });
  ///netejar l'input i posar hi el focus
  $item.value = "";
  $item.focus();
});

d.querySelector(".reset").addEventListener("click", (e) => {
  alert(e);
  var objecte = {
    arrayBuit: [],
  };

  console.log(objecte);
});

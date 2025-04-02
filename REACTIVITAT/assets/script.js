let d = document,
  $item = d.querySelector("#todo-item"),
  $list = d.getElementById("todo-list");

//Estat
const state = {
  todoList: [],
};

const getState = () => JSON.parse(JSON.stringify(template.data));
/*
const items = getState();
items.todoList.push("Tasca 6");

console.log(state);
console.log(items);
*/
d.addEventListener("submit", (e) => {
  if (!e.target.matches("#todo-form")) return false;
  e.preventDefault();
  if (!$item.value) return;
  // Actualitzar l'estat de forma reactiva
  const lastState = getState();
  lastState.todoList.push($item.value);
  // state.todoList.push($item.value);
  setState({
    todoList: lastState.todoList,
  });
  //render();
  /*
  let $i = d.createElement("li");
  $i.textContent = $item.value;
  $list.appendChild($i);
    */
  $item.value = "";
  $item.focus();
});

//actualitzar l'estat de forma reactiva

//TemplateUI

const template = () => {
  if (template.data.todoList.length < 1)
    return `<p><em>Llista sense tasques</em></p>`;
  let todos = template.data.todoList.map((item) => `<li>${item}</li>`).join("");
  return todos;
};

//letat leocal dels components
template.data = {
  todoList: [],
};

//Render
const render = () => {
  console.log("Estat local: ", template.data);
  console.log("Estat global: ", state);

  const $list = d.getElementById("todo-list");
  if (!$list) return;
  $list.innerHTML = template();
};

const setState = (obj) => {
  for (let key in obj) {
    if (template.data.hasOwnProperty(key)) {
      template.data[key] = obj[key];
    }
  }
  render();
};

setState({
  nom: "toni",
  todoList: ["Tasca 1", "Tasca 2", "Tasca 3", "Tasca 4", "Tasca 5"],
});

d.addEventListener("DOMContentLoaded", render);

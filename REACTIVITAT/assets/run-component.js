import { Component } from "./component.js";

let d = document;

// fem una instancia del component amb els parametres:
/*
 referencia al DOM
 estat inicial,
 logica del template
*/
const app = new Component({
  el: "#todo-list",
  data: {
    todoList: [],
  },
  template: function (estat) {
    if (estat.todoList.length < 1)
      return `<p><em>Llista sense tasques</em></p>`;
    let todos = estat.todoList.map((item) => `<li>${item}</li>`).join("");
    return todos;
  },
});

app.setState({
  todoList: ["Tasca 1", "Tasca 2", "Tasca 3"],
});

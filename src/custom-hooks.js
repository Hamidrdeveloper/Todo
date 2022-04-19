import { useState } from "react";

export const useInputValue = (initialValue = "") => {
  const [inputValue, setInputValue] = useState(initialValue);

  return {
    inputValue,
    changeInput: (event) => setInputValue(event.target.value),
    clearInput: () => setInputValue(""),
    keyInput: (event, callback) => {
      if (event.which === 13 || event.keyCode === 13) {
        callback(inputValue);
        return true;
      }

      return false;
    },
  };
};

export const useTodos = (onUpdateTask,onDeleteTask) => {
  const [todos, setTodos] = useState([]);


  return {
    todos,
    addTodo: (text) => {
      if (text !== "") {
        setTodos(
          todos.concat({
            text,
            checked: false,
          })
        );
      }
    },
    addAllTodo: (taskList) => {
      if (taskList !== null) {
        let array = [];
        taskList?.forEach((res) => {
          let description = res.description;

          array.push({ text: description, checked: res.completed,id:res._id});
        });
        console.log(array);
        setTodos(array);
      }
    },
    checkTodo: (idx) => {
      
      setTodos(
        todos.map((todo, index) => {
          if (idx === index) {
            todo.checked = !todo.checked;
            onUpdateTask(todo.text, todo.checked,todo.id)
          }

          return todo;
        })
      );
    },
    removeTodo: (idx) => {
      setTodos(todos.filter((value, index) => {
          if(idx == index){
            onDeleteTask(value.id);
          }
     
        return idx !== index}));
    },
    
  };
};

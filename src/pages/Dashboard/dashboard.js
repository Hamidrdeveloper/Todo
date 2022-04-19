
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { useInputValue, useTodos } from "../../custom-hooks";

import Layout from "../Todo/Layout";

import AddTodo from "../Todo/AddTodo";
import TodoList from "../Todo/TodoList";
import { useTaskDispatch, useTaskState } from "../../providers/taskProvider";

const Dashboard = () => {
    const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
 
  const { onAddTask,onGetTask,onUpdateTask,onDeleteTask } = useTaskDispatch();
  const { todos, addAllTodo,addTodo, checkTodo, removeTodo } = useTodos(onUpdateTask,onDeleteTask);
  const { taskList } = useTaskState();
  const clearInputAndAddTodo = () => {
    addTodo(inputValue);
    onAddTask(inputValue,false);
    clearInput()
  };
  useEffect(() => {
    onGetTask()

  }, [])
  useEffect(()=>{
      console.log("taskList",taskList);
    addAllTodo(taskList)
  },[taskList])
    // const { name, email } = data;

    return (
        <Layout>
        <AddTodo
          inputValue={inputValue}
          onInputChange={changeInput}
          onButtonClick={clearInputAndAddTodo}
          onInputKeyPress={(event) => keyInput(event, clearInputAndAddTodo)}
        />
        <TodoList
          items={todos}
          onItemCheck={checkTodo}
          onItemRemove={removeTodo}
        />
      </Layout>
    );
};

export default Dashboard;

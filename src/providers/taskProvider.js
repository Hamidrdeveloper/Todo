import React, { createContext, useContext, useReducer } from "react";
import { useTodos } from "../custom-hooks";
import { TaskService } from "../services";

const TaskState = createContext();
const TaskDispatch = createContext();

const EVENT_TYPES = {
  UPDATE: "update",
  ERROR: "error",
};

const EVENTS = {
  [EVENT_TYPES.UPDATE]: (state, event) => {
    const { value } = event.payload;

    return {
      ...state,
      taskList: value,
    };
  },
  [EVENT_TYPES.ERROR]: (state, event) => {
    const { error } = event.payload;
    return {
      ...state,
      error,
    };
  },
  [EVENT_TYPES.CLEAR_ERRORS]: (state) => {
    return {
      ...state,
      error: "",
    };
  },
};

const INITIAL_STATE = {
  description: "",
  completed: false,
  taskList: [],
};

const TaskReducer = (state, event) => {
  return EVENTS[event.type](state, event) || state;
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TaskReducer, INITIAL_STATE);
  const handleGet = (event) => {
   

    TaskService.getTask()
      .then((res) => {
        console.log("handleUpdate", res);
        const value = res;
        dispatch({
          type: EVENT_TYPES.UPDATE,
          payload: { value },
        });
      })
      .catch(({ message }) => {
      
      });
  };
  const handleUpdate = (description, completed, id) => {


    TaskService.updateTask(description, completed, id)
      .then((res) => {
        console.log("handleUpdate", res);
      })
      .catch(({ message }) => {});
  };
  const handleDelete = (description, completed, id) => {
    TaskService.deleteTask(description, completed, id)
      .then((res) => {
        console.log("handleUpdate", res);
      })
      .catch(({ message }) => {});
  };
  const handleAddTask = (description, completed) => {
    TaskService.addTask(description, completed)
      .then((res) => {
        handleGet();
      })
      .catch(({ message }) => {
        dispatch({
          type: EVENT_TYPES.ERROR,
          payload: { error: message },
        });
      });
  };

  const events = {
    onAddTask: handleAddTask,
    onGetTask: handleGet,
    onUpdateTask: handleUpdate,
    onDeleteTask: handleDelete,
  };

  return (
    <TaskState.Provider value={state}>
      <TaskDispatch.Provider value={events}>{children}</TaskDispatch.Provider>
    </TaskState.Provider>
  );
};

const useTaskState = () => {
  const context = useContext(TaskState);

  if (context === undefined) {
    throw new Error("useTaskState must be used within a TaskProvider");
  }

  return context;
};

const useTaskDispatch = () => {
  const context = useContext(TaskDispatch);

  if (context === undefined) {
    throw new Error("useTaskDispatch must be used within a TaskProvider");
  }

  return context;
};

export { TaskProvider, useTaskState, useTaskDispatch };

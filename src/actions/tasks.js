import * as actionTypes from "../constants/action-types";

export const createTask = (task) => {
  return {
    type: actionTypes.CREATE_TASK,
    payload: task
  };
};

export const deleteTask = (taskId) => {
  return {
    type: actionTypes.DELETE_TASK,
    payload: taskId
  };
};

export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:5000/tasks");
    const data = await response.json();
    // Dispatch an action to store the fetched tasks in the Redux store
    dispatch({
      type: actionTypes.FETCH_TASKS,
      payload: data,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

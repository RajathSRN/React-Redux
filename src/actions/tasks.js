import * as actionTypes from "../constants/action-types";
import axios from "axios";

export const createTask = (newTask) => async(dispatch) => {
  dispatch({ type: actionTypes.CREATE_TASK_REQUEST });
  try {
    const response = await axios.post("http://localhost:5000/tasks", newTask);
    dispatch({
      type: actionTypes.CREATE_TASK_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.error("Error creating task:", error);
    dispatch({
      type: actionTypes.CREATE_TASK_ERROR,
      payload: error
    });
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_TASK_REQUEST });
  try {
    await axios.delete(`http://localhost:5000/tasks/${taskId}`);
    dispatch({
      type: actionTypes.DELETE_TASK_SUCCESS,
      payload: taskId
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    dispatch({
      type: actionTypes.DELETE_TASK_ERROR,
      payload: error
    });
  }
};

export const fetchTasks = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FETCH_TASKS_REQUEST });
    const response = await axios.get("http://localhost:5000/tasks");
    //const response = await fetch("http://localhost:5000/tasks", { method: "GET" });
    //const data = await response.json();
    // Dispatch an action to store the fetched tasks in the Redux store
    dispatch({
      type: actionTypes.FETCH_TASKS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_TASKS_ERROR,
      payload: error,
    });
    console.error("Error fetching tasks:", error);
  }
};

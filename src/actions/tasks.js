import * as actionTypes from "../constants/action-types";
import axios from "axios";

/**
 * Action creator to create a new task.
 * Returns an action with a promise payload for redux-promise-middleware.
 * we automatically get
 * CREATE_TASK_PENDING, CREATE_TASK_FULFILLED, and CREATE_TASK_REJECTED actions
 *
 * @param {Object} newTask - The new task object to be created.
 * @returns {Object} Redux action with type and promise payload.
 */
export const createTask = (newTask) => ({
  type: actionTypes.CREATE_TASK,
  payload: axios.post("http://localhost:5000/tasks", newTask)
});


/**
 * Action creator to delete a task.
 * Returns an action with a promise payload for redux-promise-middleware.
 * we automatically get
 * DELETE_TASK_PENDING, DELETE_TASK_FULFILLED, and DELETE_TASK_REJECTED actions
 *
 * @param {number} taskId - The ID of the task to be deleted.
 * @returns {Object} Redux action with type and promise payload.
 */
export const deleteTask = (taskId) => ({
  type: actionTypes.DELETE_TASK,
  payload: axios.delete(`http://localhost:5000/tasks/${taskId}`)
});

/**
 * Fetch tasks from the server
 * when using redux promise middleware we automatically get
 * FETCH_TASKS_PENDING, FETCH_TASKS_FULFILLED, and FETCH_TASKS_REJECTED actions
 * @returns {Promise} - A promise that resolves to the list of tasks
 */
export const fetchTasks = () => ({
  type: actionTypes.FETCH_TASKS,
  payload: axios.get("http://localhost:5000/tasks")
});

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

import { initialTasks } from "../data/tasks";
import * as actionTypes from "../constants/action-types";

const taskReducer = (state = initialTasks, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TASK:
            return [...state, action.payload];
        case actionTypes.DELETE_TASK:
            return state.filter(task => task.id !== action.payload);
        case actionTypes.FETCH_TASKS:
            return action.payload; // Assuming payload is the array of tasks fetched from the server
        default:
            return state;
    }
};

export default taskReducer;

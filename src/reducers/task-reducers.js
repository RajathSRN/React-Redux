//import { initialTasks } from "../data/tasks";
import * as actionTypes from "../constants/action-types";

let initialState = {data: [], loading: false, error: ""};
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TASK_PENDING:
            return {data: state.data, loading: true, error: ""};
        case actionTypes.CREATE_TASK_FULFILLED:
            return {data: [...state.data, action.payload.data], loading: false, error: ""};
        case actionTypes.CREATE_TASK_REJECTED:
            return {data: state.data, loading: false, error: action.payload};

        case actionTypes.DELETE_TASK_PENDING:
            return {data: state.data, loading: true, error: ""};
        case actionTypes.DELETE_TASK_FULFILLED:{
            //commenting this as we are not using redux-promise-middleware
            /* let id = Number(action.payload.config.url.substr(action.payload.config.url.lastIndexOf('/') + 1));
            return {data: state.data.filter(task => task.id !== id), loading: false, error: ""}; 
            */
           //saga approach
           return {data: state.data.filter(task => task.id !== action.payload), loading: false, error: ""};
        }
        case actionTypes.DELETE_TASK_REJECTED:
            return {data: state.data, loading: false, error: action.payload};

        case actionTypes.FETCH_TASKS_PENDING:
            return {data: [], loading: true, error: ""} // Assuming payload is the array of tasks fetched from the server
        case actionTypes.FETCH_TASKS_FULFILLED:
            return {data: action.payload.data, loading: false, error: ""};
        case actionTypes.FETCH_TASKS_REJECTED:
            return {data: state.data, loading: false, error: action.payload};
            
        default:
            return state;
    }
};

export default taskReducer;

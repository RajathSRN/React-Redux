import taskReducer from "./task-reducers";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    tasks: taskReducer
});

export default allReducers;

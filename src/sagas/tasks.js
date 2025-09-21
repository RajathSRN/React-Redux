//import axios from "axios";
import * as actionTypes from "../constants/action-types";
import { put, call, retry } from "redux-saga/effects";
import * as api from "../api/tasks";  

//put is like dispatch
//call is like invoking a function

export const fetchTasksWorkerSaga = function* () {
    console.log("Fetch tasks worker saga invoked");
    //Pending
    yield put({ type: actionTypes.FETCH_TASKS_PENDING });
    try { 
        //fulfilled
        // let response = yield call(api.fetchTasks);
        let response = yield retry(3, 1000, api.fetchTasks);
        yield put({ type: actionTypes.FETCH_TASKS_FULFILLED, payload: response });
    } catch (error) {
        yield put({ type: actionTypes.FETCH_TASKS_REJECTED, payload: error });
    }
};

export const createTaskWorkerSaga = function* (action) {
    console.log("Create task worker saga invoked");
    //create task pending
    yield put({ type: actionTypes.CREATE_TASK_PENDING });
    try {
        //create task fulfilled
        let response = yield call(api.createTask, action.payload);
        yield put({ type: actionTypes.CREATE_TASK_FULFILLED, payload: response });
    } catch (error) {
        //create task rejected
        yield put({ type: actionTypes.CREATE_TASK_REJECTED, payload: error });
    }
};

export const deleteTaskWorkerSaga = function* (action) {
    console.log("Delete task worker saga invoked");
    //delete task pending
    yield put({ type: actionTypes.DELETE_TASK_PENDING });
    try {
        //delete task fulfilled
        yield call(api.deleteTask, action.payload);
        yield put({ type: actionTypes.DELETE_TASK_FULFILLED, payload: action.payload });
    } catch (error) {
        //delete task rejected
        yield put({ type: actionTypes.DELETE_TASK_REJECTED, payload: error });
    }
};




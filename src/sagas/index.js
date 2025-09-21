import { createTaskWorkerSaga, fetchTasksWorkerSaga, deleteTaskWorkerSaga } from "./tasks";
import { takeEvery, throttle, fork, all, call } from "redux-saga/effects";//map actions to worker sagas
import * as actionTypes from "../constants/action-types";

export const taskwatcherSaga = function* () {
    //fetchTasks watcher
    yield takeEvery(actionTypes.FETCH_TASKS, fetchTasksWorkerSaga);
    
    //Adding more watchers here createTask, deleteTask
    yield throttle(1000, actionTypes.CREATE_TASK, createTaskWorkerSaga);
    
    yield takeEvery(actionTypes.DELETE_TASK, deleteTaskWorkerSaga);
};

export const employeeWatcherSaga = function* () {
    //employee related sagas will go here
    yield console.log("Employee watcher saga invoked: no employee sagas yet");
};

export const rootSaga = function* () {
    console.log("Root saga invoked");
    yield all([
        call(taskwatcherSaga),
        fork(employeeWatcherSaga)
    ]);
};
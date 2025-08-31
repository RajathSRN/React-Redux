//legacyStore.js
import { createStore, applyMiddleware } from "redux";
import allReducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"
import {createLogger} from "redux-logger"
import * as actionTypes from "../constants/action-types";
import { v1 as uuid } from "uuid";

// const logger = createLogger({
//   collapsed: true,
//   diff: true
// });

//expand if error object returned
const logger = createLogger({
  predicate: (getState, action) => {
    return process.env.REACT_APP_ENVIRONMENT === "DEV"
  },
  collapsed: (getState, action, logEntry) => {
    return !logEntry.nextState.tasks.error
  },
  diff: true
});

//creating custom middleware
const myLogger = (store) => (next) => (action) => {
  console.log("Logged Action by my custom middleware action: ", action);
  console.log("Logged Action by my custom middleware next: ", next);
  console.log("Logged Action by my custom middleware store: ", store);
  if (action.type === actionTypes.CREATE_TASK_REQUEST) {
    action.payload.id = uuid();
  }
  next(action);
};

var store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(myLogger, thunk, logger))
);

export default store;

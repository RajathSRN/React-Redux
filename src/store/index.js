//legacyStore.js
import { createStore, applyMiddleware } from "redux";
import allReducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"
import {createLogger} from "redux-logger"
import reduxPromiseMiddleware from "redux-promise-middleware";

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

//creating middleware array
const middleware = [thunk, reduxPromiseMiddleware, logger];

var store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

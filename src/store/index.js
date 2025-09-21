//legacyStore.js
import { createStore, applyMiddleware } from "redux";
import allReducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"
import {createLogger} from "redux-logger"
import reduxPromiseMiddleware from "redux-promise-middleware";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas";

// const logger = createLogger({
//   collapsed: true,
//   diff: true
// });

//saga middleware
let saga = createSagaMiddleware();

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
const middleware = [thunk, saga, reduxPromiseMiddleware, logger];

var store = createStore(
  allReducers, {},
  composeWithDevTools(applyMiddleware(...middleware))
);

//invoke root saga
saga.run(rootSaga);

export default store;

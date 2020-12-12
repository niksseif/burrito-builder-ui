import { applyMiddleware, compose, createStore } from "redux";
import combineReducers from "./reducers/orders-reducer";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
//enhancing a store with apply middleware from devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers =
  process.env.NODE_ENV !== "production"
    ? composeEnhancers(applyMiddleware(thunkMiddleware, logger))
    : composeEnhancers(applyMiddleware(thunkMiddleware));

export default function setupStore(initialState) {
  return createStore(combineReducers, initialState, enhancers);
}

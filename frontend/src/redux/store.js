import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import AuthReducer from "./Auth/authReducer"
import AppReducer from "./app/AppReducer"
import thunk from "redux-thunk";

const rootReducer = combineReducers({auth:AuthReducer, app:AppReducer});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
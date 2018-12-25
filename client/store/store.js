import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import { criteriaReducer, itemReducer } from "reducers/criteriaReducer";

export default createStore(
  combineReducers({
    criteria: criteriaReducer,
    items: itemReducer,
  }),
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

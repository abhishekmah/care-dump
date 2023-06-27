import { combineReducers } from "redux";
import inboxPageReducer from "./inboxReducer";

export default combineReducers({
  inboxReducer: inboxPageReducer,
});

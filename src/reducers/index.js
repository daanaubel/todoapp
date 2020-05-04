import { combineReducers } from "redux";
import todos from "./Todos";
import auth from "./auth";

export default combineReducers({
  todos,
  auth,
});

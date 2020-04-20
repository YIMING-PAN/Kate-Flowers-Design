import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import taskReducer from "./taskReducer";
import accountReducer from "./accountReducer";
import chatReducer from "./chatReducer";

const reduers = combineReducers({
  login: loginReducer,
  register: registerReducer,
  task: taskReducer,
  account: accountReducer,
  chat: chatReducer
});

export default reduers;

import { combineReducers } from "redux";
import authReducers from "./authReducers";
import bugsReducers from "./bugsReducers";

const rootReducers = combineReducers({ authReducers, bugsReducers });

export default rootReducers;

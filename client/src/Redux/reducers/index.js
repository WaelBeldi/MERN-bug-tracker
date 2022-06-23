import { combineReducers } from "redux";
import authReducers from "./authReducers";
import bugsReducers from "./bugsReducers";
import usersReducers from "./usersReducers";

const rootReducers = combineReducers({ authReducers, bugsReducers, usersReducers });

export default rootReducers;

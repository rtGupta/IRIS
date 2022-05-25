import { combineReducers } from "redux";
import dispatcherReducer from "./dispatcher-reducer";
import userReducer from "./user-reducer";

const rootReducer = combineReducers({
    dispatcherReducer,
    userReducer
});

export default rootReducer;
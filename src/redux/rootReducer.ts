import { combineReducers } from "redux";
import { initialURLReducer } from "./reducers/initialURL/initialURLReducer";
import { userReducer } from "./reducers/user/userReducer";

export const rootReducer = combineReducers({ initialURLReducer, userReducer });

export type RootState = ReturnType<typeof rootReducer>;

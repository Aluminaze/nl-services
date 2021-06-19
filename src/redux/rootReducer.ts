import { combineReducers } from "redux";
import { initialURLReducer } from "./reducers/initialURLReducer";
import { userReducer } from "./reducers/userReducer";

export const rootReducer = combineReducers({ initialURLReducer, userReducer });

export type RootState = ReturnType<typeof rootReducer>;

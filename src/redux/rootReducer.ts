import { initialURLReducer } from "./reducers/initialURLReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ initialURLReducer });

export type RootState = ReturnType<typeof rootReducer>;

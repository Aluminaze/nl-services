import { rootReducer } from "./rootReducer";
import { createStore } from "redux";

export const store = createStore(rootReducer);

export type ReduxDispatch = typeof store.dispatch;

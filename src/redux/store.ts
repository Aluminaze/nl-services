import { rootReducer } from "./rootReducer";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

export type ReduxDispatch = typeof store.dispatch;

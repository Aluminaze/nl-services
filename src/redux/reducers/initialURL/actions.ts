import {
  initialURLActionTypes,
  initialURLReducerInterface,
  SetInitialURLActionInterface,
} from "./initialURLReducer";

export const setInitialURLActionCreator = (
  payload: initialURLReducerInterface
): SetInitialURLActionInterface => ({
  type: initialURLActionTypes.SET_URL,
  payload,
});

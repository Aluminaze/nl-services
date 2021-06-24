import {
  SetUserActionInterface,
  userActionTypes,
  PayloadSetUserInterface,
} from "./userReducer";

export const setUserActionCreator = (
  payload: PayloadSetUserInterface
): SetUserActionInterface => ({
  type: userActionTypes.SET_USER,
  payload,
});

export const resetUserActionCreator = () => ({
  type: userActionTypes.RESET_USER,
});

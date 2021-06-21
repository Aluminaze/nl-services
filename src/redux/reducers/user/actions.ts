import {
  SetUserActionInterface,
  userActionTypes,
  UserReducerInterface,
} from "./userReducer";

export const setUserActionCreator = (
  payload: UserReducerInterface
): SetUserActionInterface => ({
  type: userActionTypes.SET_USER,
  payload,
});

export const resetUserActionCreator = () => ({
  type: userActionTypes.RESET_USER,
});

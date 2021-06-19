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

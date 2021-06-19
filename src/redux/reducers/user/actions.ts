import { UserStruct } from "interfacesAndTypes";
import { SetUserActionInterface, userActionTypes } from "./userReducer";

export const setUserActionCreator = (
  payload: UserStruct
): SetUserActionInterface => ({
  type: userActionTypes.SET_USER,
  payload,
});

import {
  SetUserActionInterface,
  userActionTypes,
  PayloadSetUserInterface,
  PayloadSetUserAdditionalDataInterface,
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

export const setUserAdditionalData = (
  payload: PayloadSetUserAdditionalDataInterface
) => ({
  type: userActionTypes.SET_USER_ADDITIONAL_DATA,
  payload,
});

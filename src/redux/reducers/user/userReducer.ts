export interface UserReducerInterface {
  email: string;
  name: string;
  isAuthorized: boolean;
}

const initialState: UserReducerInterface = {
  email: "",
  name: "",
  isAuthorized: false,
};

export enum userActionTypes {
  SET_USER = "SET_USER",
  RESET_USER = "RESET_USER",
}

export interface SetUserActionInterface {
  type: userActionTypes.SET_USER;
  payload: UserReducerInterface;
}

export interface ResetUserActionInterface {
  type: userActionTypes.RESET_USER;
}

type UserActions = SetUserActionInterface | ResetUserActionInterface;

export const userReducer = (
  state = initialState,
  action: UserActions
): UserReducerInterface => {
  switch (action.type) {
    case userActionTypes.SET_USER:
      return {
        email: action.payload.email,
        name: action.payload.name,
        isAuthorized: action.payload.isAuthorized,
      };
    case userActionTypes.RESET_USER:
      return {
        email: "",
        name: "",
        isAuthorized: false,
      };
    default:
      return state;
  }
};

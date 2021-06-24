export interface UserReducerInterface {
  id: string;
  email: string;
  fullName: string;
  isAuthorized: boolean;
  name: string;
  score: number | null;
  sieges: boolean;
  tournaments: boolean;
}

const initialState: UserReducerInterface = {
  email: "",
  fullName: "",
  isAuthorized: false,
  id: "",
  name: "",
  score: null,
  sieges: false,
  tournaments: false,
};

export enum userActionTypes {
  SET_USER = "SET_USER",
  RESET_USER = "RESET_USER",
  SET_USER_ADDITIONAL_DATA = "SET_USER_ADDITIONAL_DATA",
}

export interface SetUserActionInterface {
  type: userActionTypes.SET_USER;
  payload: PayloadSetUserInterface;
}

export interface ResetUserActionInterface {
  type: userActionTypes.RESET_USER;
}

export interface SetUserAdditionalDataInterface {
  type: userActionTypes.SET_USER_ADDITIONAL_DATA;
  payload: PayloadSetUserAdditionalDataInterface;
}

export interface PayloadSetUserInterface {
  email: string;
  fullName: string;
  isAuthorized: boolean;
}

export interface PayloadSetUserAdditionalDataInterface {
  id: string;
  name: string;
  score: number | null;
  sieges: boolean;
  tournaments: boolean;
}

type UserActions =
  | SetUserActionInterface
  | ResetUserActionInterface
  | SetUserAdditionalDataInterface;

export const userReducer = (
  state = initialState,
  action: UserActions
): UserReducerInterface => {
  switch (action.type) {
    case userActionTypes.SET_USER:
      return {
        ...state,
        email: action.payload.email,
        fullName: action.payload.fullName,
        isAuthorized: action.payload.isAuthorized,
      };
    case userActionTypes.RESET_USER:
      return {
        email: "",
        fullName: "",
        isAuthorized: false,
        id: "",
        name: "",
        score: null,
        sieges: false,
        tournaments: false,
      };
    case userActionTypes.SET_USER_ADDITIONAL_DATA:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        score: action.payload.score,
        sieges: action.payload.sieges,
        tournaments: action.payload.sieges,
      };
    default:
      return state;
  }
};

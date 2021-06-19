import { UserStruct } from "interfacesAndTypes";

export interface UserReducerInterface extends UserStruct {
  isAuthorized: boolean;
}

const initialState: UserReducerInterface = {
  id: "",
  name: "",
  score: 0,
  email: "",
  tournaments: false,
  sieges: false,
  isAuthorized: false,
};

export enum userActionTypes {
  SET_USER = "SET_USER",
  RESET_USER = "RESET_USER",
  UPDATE_SCORE = "UPDATE_SCORE",
}

export interface SetUserActionInterface {
  type: userActionTypes.SET_USER;
  payload: UserReducerInterface;
}

export interface ResetUserActionInterface {
  type: userActionTypes.RESET_USER;
}

export interface UpdateScoreActionInterface {
  type: userActionTypes.UPDATE_SCORE;
  payload: number;
}

type UserActions =
  | SetUserActionInterface
  | ResetUserActionInterface
  | UpdateScoreActionInterface;

export const userReducer = (
  state = initialState,
  action: UserActions
): UserReducerInterface => {
  switch (action.type) {
    case userActionTypes.SET_USER:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        score: action.payload.score,
        email: action.payload.email,
        tournaments: action.payload.tournaments,
        sieges: action.payload.sieges,
        isAuthorized: action.payload.isAuthorized,
      };
    case userActionTypes.RESET_USER:
      return {
        ...state,
        id: "",
        name: "",
        score: 0,
        email: "",
        tournaments: false,
        sieges: false,
        isAuthorized: false,
      };
    case userActionTypes.UPDATE_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
};

import { UserStruct } from "interfacesAndTypes";

const initialState: UserStruct = {
  id: "",
  name: "",
  score: 0,
  email: "",
  tournaments: false,
  sieges: false,
};

enum userActionTypes {
  SET_USER = "SET_USER",
  RESET_USER = "RESET_USER",
  UPDATE_SCORE = "UPDATE_SCORE",
}

interface SetUserActionInterface {
  type: userActionTypes.SET_USER;
  payload: UserStruct;
}

interface ResetUserActionInterface {
  type: userActionTypes.RESET_USER;
}

interface UpdateScoreActionInterface {
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
): UserStruct => {
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

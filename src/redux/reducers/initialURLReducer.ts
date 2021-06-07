interface initialURLReducerInterface {
  initialURL: string | null;
}

enum initialURLActionTypes {
  SET_URL = "SET_URL",
  RESET_URL = "RESET_URL",
}

interface SetInitialURLActionInterface {
  type: initialURLActionTypes.SET_URL;
  payload: initialURLReducerInterface;
}

interface ResetInitialURLActionInterface {
  type: initialURLActionTypes.RESET_URL;
}

type InitialURLActions =
  | SetInitialURLActionInterface
  | ResetInitialURLActionInterface;

const initialState: initialURLReducerInterface = {
  initialURL: null,
};

export const initialURLReducer = (
  state = initialState,
  action: InitialURLActions
): initialURLReducerInterface => {
  switch (action.type) {
    case initialURLActionTypes.SET_URL:
      return {
        ...state,
        initialURL: action.payload.initialURL,
      };
    default:
      return state;
  }
};

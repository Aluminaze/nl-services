import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";

const useInitialURL = () =>
  useSelector((state: RootState) => state.initialURLReducer.initialURL);

export default useInitialURL;

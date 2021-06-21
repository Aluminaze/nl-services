import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";

const useUser = () => useSelector((state: RootState) => state.userReducer);

export default useUser;

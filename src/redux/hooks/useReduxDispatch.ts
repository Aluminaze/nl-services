import { useDispatch } from "react-redux";
import { ReduxDispatch } from "./../store";

const useReduxDispatch = () => useDispatch<ReduxDispatch>();

export default useReduxDispatch;

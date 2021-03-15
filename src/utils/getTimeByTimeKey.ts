import { TimeKeyStruct } from "./../interfacesAndTypes";
import {
  TIME_KEY_11,
  TIME_KEY_15,
  TIME_KEY_19,
  TIME_KEY_23,
} from "./constants";

const getTimeByTimeKey = (timeKey: TimeKeyStruct): string => {
  switch (timeKey) {
    case TIME_KEY_11:
      return "11:00";
    case TIME_KEY_15:
      return "15:00";
    case "time19":
      return TIME_KEY_19;
    case "time23":
      return TIME_KEY_23;
    default:
      return "";
  }
};

export default getTimeByTimeKey;

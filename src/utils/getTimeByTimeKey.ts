const getTimeByTimeKey = (timeKey: string): string => {
  switch (timeKey) {
    case "time11":
      return "11:00";
    case "time15":
      return "15:00";
    case "time19":
      return "19:00";
    case "time23":
      return "23:00";
    default:
      return "";
  }
};

export default getTimeByTimeKey;

import { makeStyles } from "@material-ui/core";
import { HEADER_HEIGHT } from "utils/constants";

const useStyles = makeStyles(() => {
  return {
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    },
    nav: {
      flexBasis: "15%",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      borderRight: `2px solid #d9dde3`,
      padding: "20px 0",

      backgroundColor: "rgba(199,199,199, .1)",
    },
    content: {
      height: "100%",
      width: "100%",
      padding: "20px",
    },
  };
});

export default useStyles;

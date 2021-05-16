import { makeStyles } from "@material-ui/core";
import { HEADER_HEIGHT } from "utils/constants";

const useStyles = makeStyles(() => {
  return {
    main: {
      gridArea: "main",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // width: "100%",
      // height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    },
    nav: {
      gridArea: "nav",
      flexDirection: "column",
      position: "fixed",
      top: 40,
      bottom: 0,
      display: "flex",
      borderRight: `2px solid #d9dde3`,
      backgroundColor: "rgba(199,199,199, .1)",
    },
    content: {
      height: "100%",
      width: "100%",
      padding: "20px",
      overflow: "hidden",
    },
    iconWrap: {
      margin: "0 10px 0 0",
    },
    listItem: {
      width: 290,
    },
  };
});

export default useStyles;

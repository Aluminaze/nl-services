import { makeStyles, useTheme } from "@material-ui/core";
import { HEADER_HEIGHT } from "utils/constants";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    header: {
      gridArea: "header",
      position: "fixed",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: HEADER_HEIGHT,
      backgroundColor: theme.palette.primary.main,
      zIndex: 100,
    },
    headerLabel: {
      fontSize: 18,
      color: "#fff",
      padding: "0 0 0 12px",
    },
    headerInfo: {
      display: "flex",
      padding: "0 12px 0 0",
    },
    headerInfoUser: {
      display: "flex",
      alignItems: "center",
    },
    headerInfoUserRating: {
      backgroundColor: "white",
      padding: "3px 12px",
      borderRadius: 5,
    },
    headerInfoUserName: {
      color: theme.palette.primary.main,

      fontSize: "1.1rem",
      margin: "0 10px 0 0",
      fontWeight: 600,
    },
    headerInfoUserScore: {
      color: theme.palette.primary.main,
      fontSize: "1.1rem",
      fontWeight: 600,
    },
    dialogBar: {
      backgroundColor: theme.palette.primary.main,
    },
    menuItemIcon: {
      display: "flex",
      alignItems: "center",
      margin: "0 10px 0 0",
    },
    menuItemUser: {
      display: "flex",
      flexDirection: "column",
      "& h1": {
        fontSize: 14,
      },
      "& h2": {
        fontSize: 12,
        fontWeight: 400,
      },
    },
    divider: {
      margin: "8px 0",
    },
    menuItemRating: {
      display: "flex",
      flexDirection: "column",
      minWidth: "100%",
      "& h1": {
        fontSize: 14,
      },
    },
    menuItemRatingInfo: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: theme.palette.primary.main,
      padding: "3px 12px",
      borderRadius: 5,
      margin: "5px 0 0 0",

      "& span": {
        color: "white",
      },
    },
  };
});

export default useStyles;

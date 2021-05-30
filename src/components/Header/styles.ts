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
      zIndex: 1500,
    },
    headerLabel: {
      fontSize: 18,
      color: "#fff",
      padding: "0 0 0 12px",
    },
    headerUserInfo: {
      display: "flex",
      padding: "0 12px 0 0",

      "& h2": {
        alignSelf: "center",
        color: "#fff",
        fontSize: 14,
        margin: "0 10px 0 0",
      },
    },
    dialog: {
      padding: "48px 0 0 0",
    },
  };
});

export default useStyles;

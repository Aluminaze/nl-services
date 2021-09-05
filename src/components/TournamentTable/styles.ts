import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    display: "flex",
    justifyContent: "center",
  },
  tableWrapper: {
    height: "100%",

    [theme.breakpoints.down("sm")]: {
      maxWidth: 310,
      width: "100%",
    },
  },
  tableContainer: {
    width: "100%",
    height: "auto",
    padding: "20px 25px",

    [theme.breakpoints.down("sm")]: {
      padding: "10px 0",
    },
  },
  info: {
    margin: "20px 0",
  },
  infoTitle: {
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      textAlign: "center",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
  },
}));

export default useStyles;

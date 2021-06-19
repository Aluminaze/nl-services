import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexBasis: "10%",

    "& h1": {
      fontWeight: 500,
    },

    [theme.breakpoints.down("sm")]: {
      "& h1": {
        fontSize: "1.2rem",
      },
    },

    [theme.breakpoints.down("xs")]: {
      "& h1": {
        fontSize: "1.1rem",
      },
    },
  },
  listWrapper: {
    display: "flex",
    flexBasis: "90%",
    overflowY: "auto",
    borderTop: "1px solid rgba(0, 0, 0, 0.3)",
    padding: "10px 0",
    margin: "10px 0 0 0",
  },
  list: {
    padding: "15px 0 10px 0",
    "& li": {
      margin: "5px 0",
      color: "#000",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "0 0 10px 0",
    },
  },
}));

export default useStyles;

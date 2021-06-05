import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: 500,

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
  },
  headerDatePicker: {
    flexBasis: "25%",
  },
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
  tableInfo: {
    margin: "20px 0",

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
}));

export default useStyles;

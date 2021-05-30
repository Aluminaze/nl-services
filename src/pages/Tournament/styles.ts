import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "auto",
  },
  table: {
    display: "flex",
    justifyContent: "center",
  },
  tableContainer: {
    width: "100%",
    height: "100%",

    "& h1": {
      fontWeight: 500,
      margin: "0 0 15px 0",
    },

    [theme.breakpoints.down("sm")]: {
      "& h1": {
        fontSize: "1.2rem",
      },
    },
  },
}));

export default useStyles;

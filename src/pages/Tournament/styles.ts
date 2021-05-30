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
    padding: "20px 25px",

    "& h1": {
      fontWeight: 500,
      margin: "0 0 15px 0",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "10px 0",

      "& h1": {
        fontSize: "1.2rem",
      },
    },
  },
}));

export default useStyles;

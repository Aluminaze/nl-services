import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
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
  },
}));

export default useStyles;

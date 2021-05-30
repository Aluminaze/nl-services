import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexBasis: "10%",
  },
  headerTitle: {
    fontWeight: 500,
  },
  headerDatePicker: {
    flexBasis: "25%",
  },
  table: {
    display: "flex",
    justifyContent: "center",
    flexBasis: "90%",
    overflowY: "auto",
    padding: "10px",
  },
  tableWrapper: {
    height: "100%",
  },
  tableContainer: {
    width: "100%",
    height: "auto",
    padding: "20px 25px",

    "& h1": {
      fontSize: 22,
      margin: "0 0 15px 0",
    },
  },
}));

export default useStyles;

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
  tableBlock: {
    display: "flex",
    justifyContent: "space-between",
  },
  tableBlockInfo: {
    minHeight: 190,
    width: "100%",
    margin: "10px 10px 10px 0",
    border: "1px solid gray",
    borderRadius: 5,
    padding: "10px",

    "& h2": {
      fontSize: 18,
    },
  },
  list: {
    margin: "10px 0 0 0",
  },
  tableBlockAdding: {
    border: "1px solid gray",
    borderRadius: 5,
    padding: "10px",
  },
  tableBlockButtons: {
    minWidth: 325,
    flexBasis: "40%",
    margin: "10px 0 0 0",
  },
}));

export default useStyles;

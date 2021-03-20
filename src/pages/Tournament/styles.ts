import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
  },
  tableWrapper: {
    flexBasis: "40%",
    height: "auto",
    border: "1px solid black",
    borderRadius: 15,
    padding: "10px",
  },
  tableContainer: {
    width: "100%",
    height: "100%",
    padding: "20px 25px",
    overflowY: "auto",

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
  button: {
    display: "flex",
    height: 50,
  },
}));

export default useStyles;

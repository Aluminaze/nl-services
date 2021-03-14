import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  table: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
  },
  tableCol: {
    flexBasis: "49%",
    height: "100%",
    border: "1px solid black",
    padding: "20px 25px",
    borderRadius: 15,

    "& h1": {
      fontSize: 22,
    },
  },
  tableColBlock: {
    margin: "10px 0",
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
  buttons: {
    margin: "10px 0 0 0",
  },
}));

export default useStyles;

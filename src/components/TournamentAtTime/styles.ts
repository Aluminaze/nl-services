import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  tableBlock: {
    display: "flex",
    justifyContent: "space-between",
  },
  tableBlockInfo: {
    minHeight: 190,
    width: "100%",
    maxWidth: 470,
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
  tableBlockActions: {
    minWidth: 325,
    flexBasis: "40%",
    margin: "10px 0 0 0",
  },
}));

export default useStyles;

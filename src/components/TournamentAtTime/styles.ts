import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  tableBlock: {
    display: "flex",
    justifyContent: "space-between",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      border: "1px solid black",
      borderRadius: 15,
      padding: "0 0 15px 0",
      margin: "0 0 20px 0",
    },
  },
  tableBlockInfo: {
    minHeight: 190,
    minWidth: 310,
    margin: "10px 10px 10px 0",
    border: "1px solid gray",
    borderRadius: 5,
    padding: "10px",

    "& h2": {
      fontSize: 18,
    },

    [theme.breakpoints.down("sm")]: {
      minHeight: "auto",
      border: "none",
    },
  },
  tableBlockInfoHeader: {
    display: "flex",
    flexDirection: "column",
  },
  tableBlockInfoHeaderElement: {
    display: "flex",
    alignItems: "center",

    "& h2": {
      fontWeight: 500,
    },
    "& h3": {
      margin: "0 0 0 31px",
      fontWeight: 400,
      fontSize: 16,
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

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      margin: 0,
    },
  },
  infoIconWrapper: {
    display: "flex",
    margin: "0 7px 0 0",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default useStyles;

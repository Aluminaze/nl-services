import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  row: {
    display: "flex",
    alignItems: "center",
    margin: "5px 0",
  },
  rowText: {
    minWidth: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid gray",
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,.1)",
    padding: "5px 15px 5px 10px",
  },
  rowTextUnregular: {
    backgroundColor: "rgba(162,17,17,.8)",
  },
  textRegular: {
    color: "#000",
  },
  textUnregular: {
    color: "#fff",
  },
  iconWrapper: {
    marginLeft: 7,
    "&:hover": {
      cursor: "pointer",
    },
  },
  rowTextElement: {
    display: "flex",
    alignItems: "center",
  },
  rowTextElementCheckbox: {
    display: "flex",
    minHeight: 24,
    minWidth: 24,
    alignItems: "center",
    margin: "0 8px 0 0",
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default useStyles;

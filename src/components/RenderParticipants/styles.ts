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
    justifyContent: "space-between",
    border: "1px solid gray",
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,.1)",
    padding: "5px 15px",
  },
  rowTextUserName: {},
  rowTextCount: {},
  iconWrapper: {
    marginLeft: 7,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default useStyles;

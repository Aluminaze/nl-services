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
    margin: "0 0 15px 0",

    "& h1": {
      fontWeight: 500,
    },
  },
  headerTitle: {},
  listWrapper: {
    display: "flex",
    flexBasis: "90%",
    overflowY: "auto",
    borderTop: "1px solid rgba(0, 0, 0, 0.3)",
    padding: "10px 0",
  },
  list: {
    padding: "15px 0 10px 0",
    "& li": {
      margin: "5px 0",
      color: "#000",
    },
  },
}));

export default useStyles;

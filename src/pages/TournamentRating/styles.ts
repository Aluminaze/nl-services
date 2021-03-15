import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  alignCenter: {
    justifyContent: "center",
  },
  tableWrapper: {
    flexBasis: "50%",
    height: "95%",
    border: "1px solid black",
    borderRadius: 15,
    padding: "10px",
  },
  tableContainer: {
    width: "100%",
    minWidth: 500,
    height: "100%",
    padding: "20px 25px",
    overflowY: "auto",
  },
  tableRow: {
    display: "flex",
    padding: "5px 0",
  },
  tableRowWithBackground: {
    backgroundColor: "rgba(0,0,0,.1)",
  },
  userName: {
    flexBasis: "80%",
    padding: "3px 10px",
  },
  userScore: {
    textAlign: "center",
    flexBasis: "20%",
  },
}));

export default useStyles;

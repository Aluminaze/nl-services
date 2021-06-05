import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 600,
  },
  alignCenter: {
    justifyContent: "center",
  },
  tableContainer: {
    width: "100%",
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

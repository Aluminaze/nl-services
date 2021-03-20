import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "80vw",
    height: "80vh",
    padding: "0 20px",
  },
  dialogList: {
    padding: "15px 0 10px 0",
    "& li": {
      margin: "5px 0",
      color: "#000",
    },
  },
  dialogInputBlock: {
    "& input": {
      border: "1px solid black",
      fontSize: 14,
      margin: "15px 0",
    },
  },
  title: {
    display: "flex",
    flexDirection: "column",
  },
  titleText: {
    margin: "0 0 0 5px",
  },
  messageText: {
    color: "#000",
  },
  button: {
    margin: "0 10px 5px 0",
  },
}));

export default useStyles;

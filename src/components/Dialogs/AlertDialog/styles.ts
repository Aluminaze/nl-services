import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  title: {
    display: "flex",
    alignItems: "center",
  },
  titleText: {
    fontWeight: 800,
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

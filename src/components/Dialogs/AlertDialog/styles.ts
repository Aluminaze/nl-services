import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    display: "flex",
    alignItems: "center",
  },
  titleText: {
    fontWeight: 800,
    margin: "0 0 0 5px",

    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  messageText: {
    color: "#000",

    [theme.breakpoints.down("xs")]: {
      fontSize: ".85rem",
    },
  },
  button: {
    margin: "0 10px 5px 0",
  },
}));

export default useStyles;

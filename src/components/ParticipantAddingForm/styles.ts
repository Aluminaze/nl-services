import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: 16,
  },
  inputWrapper: {
    margin: "15px 0 0 0",
  },
  buttonsWrapper: {
    margin: "10px 0 0 0",

    "& button": {
      margin: "0 10px 0 0",
    },
  },
  btnLabel: {
    fontSize: ".85rem",

    [theme.breakpoints.down("sm")]: {
      fontSize: ".7rem",
    },
  },
}));

export default useStyles;

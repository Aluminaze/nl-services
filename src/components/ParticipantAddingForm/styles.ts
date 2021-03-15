import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
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
}));

export default useStyles;
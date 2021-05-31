import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    display: "flex",
    alignItems: "center",
    margin: "5px 0",
  },
  rowText: {
    width: "100%",
    minWidth: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid gray",
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,.1)",
    padding: "5px 15px 5px 10px",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "auto",
    },
  },
  rowTextUnregular: {
    backgroundColor: "rgba(162,17,17,.8)",
  },
  text: {
    [theme.breakpoints.down("xs")]: {
      fontSize: ".85rem",
    },
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
  checkboxWrapper: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  confirmTitle: {
    display: "flex",
    alignItems: "center",
  },
  confirmTitleText: {
    fontWeight: 800,
    margin: "0 0 0 5px",

    "& strong": {
      color: "#f44336",
      fontSize: 18,
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",

      "& strong": {
        fontSize: "1rem",
      },
    },
  },
  confirmMessageText: {
    color: "#000",

    "& strong": {
      color: "#f44336",
      fontSize: 18,
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: ".85rem",

      "& strong": {
        fontSize: ".85rem",
      },
    },
  },
}));

export default useStyles;

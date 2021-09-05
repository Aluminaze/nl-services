import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",

    [theme.breakpoints.down("md")]: {
      margin: "0 10px",
    },
  },
  infoTitle: {
    fontSize: "1.2rem",
    fontWeight: 600,
    textAlign: "center",
  },
  infoText: {
    fontSize: "1rem",
    fontWeight: 400,
    color: "grey",
    margin: "8px 0 0 0",
    textAlign: "center",
  },
  label: {
    fontSize: "21rem",
    color: "rgba(0, 0, 0, .08)",
    userSelect: "none",

    [theme.breakpoints.down("md")]: {
      fontSize: "12rem",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "6rem",
    },
  },
}));

export default useStyles;

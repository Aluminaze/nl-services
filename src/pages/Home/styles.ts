import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

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
}));

export default useStyles;

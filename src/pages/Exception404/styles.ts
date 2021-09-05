import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
  },
  infoTitle: {
    fontSize: "5rem",
    textAlign: "center",
  },
  infoText: {
    fontSize: "1rem",
    textAlign: "center",
  },
  infoButton: {
    textAlign: "center",
    margin: "20px 0 0 0",
  },
}));

export default useStyles;

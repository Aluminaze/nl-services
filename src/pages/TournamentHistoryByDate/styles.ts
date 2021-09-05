import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    margin: "25px 0 0 0",
  },
  infoHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: {
    fontWeight: 600,
    fontSize: "1.2rem",
  },
  infoText: {
    fontSize: "1rem",
    textAlign: "center",
    margin: "10px 0 0 0",
  },
}));

export default useStyles;

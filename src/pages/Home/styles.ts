import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  infoTitle: {
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  infoText: {
    fontSize: "1rem",
    fontWeight: 400,
    color: "grey",
    margin: "8px 0 0 0",
  },
}));

export default useStyles;

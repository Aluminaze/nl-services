import { makeStyles, Theme } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
  nav: {
    gridArea: "nav",
    flexDirection: "column",
    display: "flex",
    borderRight: `2px solid #d9dde3`,
    backgroundColor: "rgba(199,199,199, .1)",
    position: "relative",
  },
  navButtons: {
    position: "sticky",
    top: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
    },
  },
  listTitle: {
    margin: "0 0 0 10px",
  },
  listItem: {
    width: "auto",
    maxWidth: 265,
    height: 48,
    display: "flex",
    justifyContent: "center",
  },
}));

export default useStyles;

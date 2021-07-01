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
  },
  listTitle: {
    margin: "0 0 0 10px",

    [theme.breakpoints.down("sm")]: {
      fontSize: ".85rem",
    },
  },
  listText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: ".85rem",
    },
  },
  listItem: {
    width: "auto",
    height: 48,
    display: "flex",
    justifyContent: "center",
  },

  navEnter: {
    opacity: 0,
    transform: "translateX(-150px)",
  },
  navEnterActive: {
    opacity: 1,
    transform: "translateX(0px)",
    transition: "all 400ms ease-out",
  },
  navExit: {
    opacity: 1,
    transform: "translateX(0px)",
  },
  navExitActive: {
    opacity: 0,
    transition: "all 400ms ease-in",
    transform: "translateX(-150px)",
  },
}));

export default useStyles;

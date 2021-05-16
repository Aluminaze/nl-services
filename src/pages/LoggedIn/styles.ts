import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => {
  return {
    container: {
      gridArea: "container",
      display: "grid",
      gridTemplateRows: "1fr",
      gridTemplateColumns: "auto 1fr",
      gridTemplateAreas: `'nav main'`,
    },
    main: {
      gridArea: "main",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    nav: {
      gridArea: "nav",
      flexDirection: "column",
      display: "flex",
      borderRight: `2px solid #d9dde3`,
      backgroundColor: "rgba(199,199,199, .1)",
      position: "relative",
    },
    navButtons: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "calc(100vh - 40px)",
    },
    navBar: {
      position: "sticky",
      top: 40,
    },
    content: {
      height: "100%",
      width: "100%",
      padding: "20px",
      overflow: "hidden",
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
  };
});

export default useStyles;

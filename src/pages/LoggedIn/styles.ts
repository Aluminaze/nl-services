import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      gridArea: "container",
      display: "grid",
      gridTemplateRows: "1fr",
      gridTemplateColumns: "auto 1fr",
      gridTemplateAreas: `'nav main'`,

      [theme.breakpoints.down("sm")]: {
        gridTemplateRows: "1fr",
        gridTemplateColumns: "auto",
        gridTemplateAreas: `'main'`,
      },
    },
    main: {
      gridArea: "main",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 20,
    },
    contentWrapper: {
      gridArea: "container",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});

export default useStyles;

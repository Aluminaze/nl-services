import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    main: {
      gridArea: "container",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",

      [theme.breakpoints.down("sm")]: {
        padding: "10px",
      },
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    authBlock: {
      minWidth: 600,
      minHeight: 350,
      padding: "20px 30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      border: "1px solid rgba(151,151,151, .5)",
      borderRadius: "15px",

      [theme.breakpoints.down("sm")]: {
        minWidth: "auto",
        minHeight: "auto",
      },
    },
    authBlockHeader: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      margin: "0 0 25px 0",

      "& h1": {
        fontSize: 20,
      },

      [theme.breakpoints.down("sm")]: {
        "& h1": {
          fontSize: "1.2rem",
        },
      },
    },
  };
});

export default useStyles;

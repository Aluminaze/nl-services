import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    authBlock: {
      width: 600,
      height: 350,
      padding: "20px 30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      border: "1px solid rgba(151,151,151, .5)",
      borderRadius: "15px",
    },
    authBlockHeader: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      margin: "0 0 25px 0",

      "& h1": {
        fontSize: 20,
      },
    },
  };
});

export default useStyles;

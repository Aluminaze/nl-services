import { makeStyles, useTheme } from "@material-ui/core";

const HEADER_HEIGHT: number = 40;

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    main: {
      position: "absolute",
      left: 0,
      top: 0,
      height: "100vh",
      width: "100vw",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 15px",
      width: "100%",
      height: HEADER_HEIGHT,
      backgroundColor: theme.palette.primary.main,
    },
    headerNav: {
      display: "flex",
    },
    headerNavBtn: {
      margin: "0 5px 0 0",
      padding: "0 5px 0 0",
      borderRight: "1px solid #fff",
    },
    headerLabel: {
      fontSize: 18,
      color: "#fff",
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    },
  };
});

export default useStyles;

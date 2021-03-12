import { makeStyles, useTheme } from "@material-ui/core";
import { HEADER_HEIGHT } from "utils/constants";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    },
    nav: {
      flexBasis: "20%",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      borderRight: `1px solid ${theme.palette.primary.main}`,
    },
    content: {
      height: "100%",
      width: "100%",
    },
  };
});

export default useStyles;

import { makeStyles, useTheme } from "@material-ui/core";
import { HEADER_HEIGHT } from "utils/constants";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 15px",
      width: "100%",
      height: HEADER_HEIGHT,
      backgroundColor: theme.palette.primary.main,
    },
    headerLabel: {
      fontSize: 18,
      color: "#fff",
    },
  };
});

export default useStyles;
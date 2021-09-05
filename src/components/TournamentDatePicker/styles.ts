import { makeStyles, Theme } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: 500,

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
  },
  headerDatePicker: {
    flexBasis: "25%",
  },
}));

export default useStyles;

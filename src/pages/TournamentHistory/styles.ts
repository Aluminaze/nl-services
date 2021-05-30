import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexBasis: "10%",
  },
  headerTitle: {
    fontWeight: 500,

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  headerDatePicker: {
    flexBasis: "25%",
  },
  table: {
    display: "flex",
    justifyContent: "center",
    flexBasis: "90%",
    overflowY: "auto",
  },
  tableWrapper: {
    height: "100%",
  },
  tableContainer: {
    width: "100%",
    height: "auto",
    padding: "20px 25px",

    [theme.breakpoints.down("sm")]: {
      padding: "10px 0",
    },
  },
}));

export default useStyles;

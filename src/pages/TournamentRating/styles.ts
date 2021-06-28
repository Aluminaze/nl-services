import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 600,
  },
  alignCenter: {
    justifyContent: "center",
  },
  tableContainer: {
    width: "100%",
  },
  customTableRow: {
    "& .MuiTableCell-root": {
      padding: "8px",
      fontSize: "1rem",
    },
  },
  selectedRow: {
    backgroundColor: "rgba(0, 153, 51, .9)",

    "& .MuiTableCell-root": {
      color: "white",
    },
  },
}));

export default useStyles;

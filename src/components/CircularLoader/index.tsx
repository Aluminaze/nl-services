import React from "react";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  loader: {
    width: "100%",
    textAlign: "center",
  },
}));

const CircularLoader = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default CircularLoader;

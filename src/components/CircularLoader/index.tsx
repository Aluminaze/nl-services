import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  loader: {
    width: "100%",
    textAlign: "center",
  },
}));

const CircularLoader: React.FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default CircularLoader;

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Header from "components/Header";
import LogIn from "pages/LogIn";
import LoggedIn from "pages/LoggedIn";

const useStyles = makeStyles(() => ({
  wrapper: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100vh",
    width: "100vw",
  },
}));

function App() {
  const classes = useStyles();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  return (
    <div className={classes.wrapper}>
      <Header isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />

      {isAuthorized ? (
        <LoggedIn />
      ) : (
        <LogIn setIsAuthorized={setIsAuthorized} />
      )}
    </div>
  );
}

export default App;

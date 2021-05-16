import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Header from "components/Header";
import LogIn from "pages/LogIn";
import LoggedIn from "pages/LoggedIn";
import { Context } from "./index";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const useStyles = makeStyles(() => ({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "40px 1fr",
    gridTemplateAreas: `'header' 'container'`,
    height: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  const { auth } = useContext(Context);
  const [user, loading] = useAuthState(auth);

  const logIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    firebase.auth().signInWithPopup(provider);
  };

  //
  // TODO: Объединить в один
  //
  if (user) {
    return (
      <div className={classes.wrapper}>
        <Header user={user} />
        <LoggedIn user={user} />
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <Header user={user} />
      <LogIn logIn={logIn} isLoading={loading} />
    </div>
  );
}

export default App;

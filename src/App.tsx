import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Header from "components/Header";
import LogIn from "pages/LogIn";
import LoggedIn from "pages/LoggedIn";
import { Context } from "./index";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
  const { auth } = useContext(Context);
  const [user, loading] = useAuthState(auth);

  const logIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <div className={classes.wrapper}>
      <Header user={user} />

      {user ? (
        <LoggedIn user={user} />
      ) : (
        <LogIn logIn={logIn} isLoading={loading} />
      )}
    </div>
  );
}

export default App;

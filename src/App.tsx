import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Header from "components/Header";
import LogIn from "pages/LogIn";
import LoggedIn from "pages/LoggedIn";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import useReduxDispatch from "redux/hooks/useReduxDispatch";
import { setInitialURLActionCreator } from "redux/reducers/initialURL/actions";
import { setUserActionCreator } from "redux/reducers/user/actions";

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
  const history = useHistory();
  const location = useLocation();
  const dispatch = useReduxDispatch();

  const [appInitCompleted, setAppInitCompleted] = useState<boolean>(false);
  const [user] = useAuthState(firebase.auth());
  const initialURL = useSelector(
    (state: RootState) => state.initialURLReducer.initialURL
  );

  const userData = useSelector((state: RootState) => state.userReducer);

  //
  // NOTE: Add user to store after success login
  //
  useEffect(() => {
    if (user && user.email && user.displayName) {
      dispatch(
        setUserActionCreator({
          email: user.email,
          name: user.displayName,
          isAuthorized: true,
        })
      );
      setAppInitCompleted(true);
    }
  }, [dispatch, user]);

  //
  // NOTE: Save incoming url path for redirect
  //
  useEffect(() => {
    dispatch(setInitialURLActionCreator({ initialURL: location.pathname }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  // NOTE: Redirect logic after success login
  //
  useEffect(() => {
    if (userData.email && initialURL) {
      history.push(`${initialURL}`);
      dispatch(setInitialURLActionCreator({ initialURL: null }));
    }
  }, [userData.email, dispatch, history, initialURL]);

  const logIn = (): void => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <div className={classes.wrapper}>
      <Header />
      {userData.isAuthorized ? (
        <LoggedIn />
      ) : (
        <LogIn logIn={logIn} appInitCompleted={appInitCompleted} />
      )}
    </div>
  );
}

export default App;

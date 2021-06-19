import React, { useEffect } from "react";
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
import { useListVals } from "react-firebase-hooks/database";
import { UserStruct } from "interfacesAndTypes";
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

  const [user, loadingUser] = useAuthState(firebase.auth());
  const refUsers = firebase.database().ref("users");
  const [usersData, loadingUsersData] = useListVals<UserStruct>(refUsers);
  const initialURL = useSelector<RootState>(
    (state) => state.initialURLReducer.initialURL
  );
  const authorizedUserData = useSelector<RootState>(
    (state) => state.userReducer
  );

  //
  // NOTE: SET USER AFTER SUCCESS LOGIN
  //
  useEffect(() => {
    if (!loadingUser && user && !loadingUsersData && usersData?.length) {
      const loggedInUserData: UserStruct | undefined = usersData.find(
        (userData: UserStruct) => userData.email === user.email
      );

      if (loggedInUserData) {
        dispatch(setUserActionCreator(loggedInUserData));
      }
    }
  }, [dispatch, loadingUser, loadingUsersData, user, usersData]);

  useEffect(() => {
    dispatch(setInitialURLActionCreator({ initialURL: location.pathname }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user?.email && initialURL) {
      history.push(`${initialURL}`);
      dispatch(setInitialURLActionCreator({ initialURL: null }));
    }
  }, [user, initialURL, history, dispatch]);

  const logIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <div className={classes.wrapper}>
      <Header user={user} />
      {user ? (
        <LoggedIn user={user} />
      ) : (
        <LogIn logIn={logIn} isLoading={loadingUser} />
      )}
    </div>
  );
}

export default App;

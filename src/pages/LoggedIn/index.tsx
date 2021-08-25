import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";
import Hidden from "@material-ui/core/Hidden";
import { UserStruct } from "interfacesAndTypes";
import useStyles from "./styles";
import Home from "pages/Home";
import Tournament from "pages/Tournament";
import ActionLogs from "pages/ActionLogs";
import TournamentRating from "pages/TournamentRating";
import TournamentHistory from "pages/TournamentHistory";
import TournamentsNavigation from "components/TournamentsNavigation";
import CircularLoader from "components/CircularLoader";
import firebase from "firebase/app";
import "firebase/database";
import useUser from "redux/hooks/useUser";
import { useDispatch } from "react-redux";
import { setUserAdditionalData } from "redux/reducers/user/actions";

interface LoggedInProps {}

const LoggedIn = (props: LoggedInProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const database = firebase.database();
  const userData = useUser();
  const [checkingAccess, setCheckingAccess] = useState<boolean>(true);

  // firebase refs
  const refUsers = database.ref("users");
  const refCurrentDate = database.ref("currentDate");

  const [usersData, loadingUsersData] = useListVals<UserStruct>(refUsers);
  const [currentDate, loadingCurrentDate] =
    useObjectVal<string>(refCurrentDate);

  //
  // NOTE: Сохранение дополнительной информации о пользователе
  //
  useEffect(() => {
    if (!loadingUsersData) {
      const userAdditionalData: UserStruct | undefined = usersData?.find(
        (user: UserStruct) => user.email === userData.email
      );

      if (userAdditionalData) {
        dispatch(
          setUserAdditionalData({
            id: userAdditionalData.id,
            name: userAdditionalData.name,
            score: userAdditionalData.score,
            sieges: userAdditionalData.sieges,
            tournaments: userAdditionalData.tournaments,
          })
        );
      }

      setCheckingAccess(false);
    }
  }, [dispatch, loadingUsersData, userData.email, usersData]);

  if (checkingAccess) {
    return (
      <div className={classes.contentWrapper}>
        <CircularLoader />
      </div>
    );
  } else {
    if (userData.tournaments) {
      return (
        <div className={classes.container}>
          <Hidden smDown>
            <TournamentsNavigation />
          </Hidden>
          <main className={classes.main}>
            <Switch>
              <Route exact path="/tournament">
                <Tournament
                  currentDate={currentDate ? currentDate : ""}
                  loadingCurrentDate={loadingCurrentDate}
                />
              </Route>
              <Route exact path="/rating">
                <TournamentRating />
              </Route>
              <Route exact path="/history">
                <TournamentHistory />
              </Route>
              <Route exact path="/action-logs">
                <ActionLogs />
              </Route>
              <Redirect to="/tournament" />
            </Switch>
          </main>
        </div>
      );
    }

    return (
      <div className={classes.contentWrapper}>
        <Home />
      </div>
    );
  }
};

export default LoggedIn;

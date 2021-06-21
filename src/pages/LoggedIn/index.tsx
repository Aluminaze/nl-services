import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";
import Hidden from "@material-ui/core/Hidden";
import { UserStruct } from "interfacesAndTypes";
import { Context } from "index";
import useStyles from "./styles";
import Home from "pages/Home";
import Tournament from "pages/Tournament";
import ActionLogsForYear from "pages/ActionLogsForYear";
import TournamentRating from "pages/TournamentRating";
import TournamentHistory from "pages/TournamentHistory";
import TournamentsNavigation from "components/TournamentsNavigation";
import CircularLoader from "components/CircularLoader";
import firebase from "firebase/app";
import "firebase/database";
import useUser from "redux/hooks/useUser";

interface LoggedInProps {}

const LoggedIn = (props: LoggedInProps) => {
  const classes = useStyles();

  const { database } = useContext(Context);
  const userData = useUser();
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [checkingAccess, setCheckingAccess] = useState<boolean>(true);

  // firebase refs
  const refUsers = firebase.database().ref("users");
  const refCurrentDate = database.ref("currentDate");

  const [usersData] = useListVals<UserStruct>(refUsers);
  const [currentDate, loadingCurrentDate] =
    useObjectVal<string>(refCurrentDate);

  //
  // NOTE: Access check
  //
  useEffect(() => {
    if (usersData?.length) {
      setHasAccess(
        !!usersData.find((user: UserStruct) => user.email === userData.email)
      );

      setCheckingAccess(false);
    }
  }, [userData.email, usersData]);

  if (checkingAccess) {
    return (
      <div className={classes.contentWrapper}>
        <CircularLoader />
      </div>
    );
  } else {
    if (hasAccess) {
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
                <ActionLogsForYear />
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

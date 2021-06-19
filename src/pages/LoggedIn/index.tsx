import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";
import Hidden from "@material-ui/core/Hidden";
import { EMAIL_DEFAULT_VALUE } from "utils/constants";
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
import { RootState } from "redux/rootReducer";
import { useSelector } from "react-redux";

interface LoggedInProps {}

const LoggedIn = (props: LoggedInProps) => {
  const classes = useStyles();
  const [allEmailsOfUsers, setAllEmailsOfUsers] = useState<string[]>([]);
  const [completeVerifyUser, setCompleteVerifyUser] = useState<boolean>(false);

  const { database } = useContext(Context);
  const userData = useSelector((state: RootState) => state.userReducer);

  // firebase refs
  const refUsers = firebase.database().ref("users");
  const refCurrentDate = database.ref("currentDate");

  const [usersData, loadingUsersData] = useListVals<UserStruct>(refUsers);

  const [currentDate, loadingCurrentDate] =
    useObjectVal<string>(refCurrentDate);

  //
  // NOTE: Collecting all user emails
  //
  useEffect(() => {
    if (usersData) {
      const collectedEmails: string[] = [];

      usersData.forEach((userData: UserStruct) => {
        if (userData.email !== EMAIL_DEFAULT_VALUE) {
          collectedEmails.push(userData.email);
        }
      });

      setAllEmailsOfUsers(collectedEmails);
      setCompleteVerifyUser(true);
    }
  }, [usersData]);

  if (!completeVerifyUser && loadingCurrentDate && loadingUsersData) {
    return (
      <div className={classes.contentWrapper}>
        <CircularLoader />
      </div>
    );
  } else {
    if (allEmailsOfUsers.includes(userData.email)) {
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

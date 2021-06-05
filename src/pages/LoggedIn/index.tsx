import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useObjectVal } from "react-firebase-hooks/database";
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

interface LoggedInProps {
  user: firebase.User | null | undefined;
}

const LoggedIn = (props: LoggedInProps) => {
  const { user } = props;
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allDataOfUsers, setAllDataOfUsers] = useState<UserStruct[]>([]);
  const [allEmailsOfUsers, setAllEmailsOfUsers] = useState<string[]>([]);
  const [completeVerifyUser, setCompleteVerifyUser] = useState<boolean>(false);

  const { database } = useContext(Context);

  // firebase refs
  const refUsers = database.ref("users");
  const refCurrentDate = database.ref("currentDate");
  const [usersData] =
    useObjectVal<{
      [key: string]: UserStruct;
    }>(refUsers);
  const [currentDate, loadingCurrentDate] =
    useObjectVal<string>(refCurrentDate);

  useEffect(() => {
    if (usersData) {
      const tempAllDataOfUsers: UserStruct[] = Object.values(usersData);
      setAllDataOfUsers(tempAllDataOfUsers);

      const tempAllEmailsOfUsers: string[] = [];
      tempAllDataOfUsers.forEach((userData: UserStruct) => {
        if (userData.email !== EMAIL_DEFAULT_VALUE) {
          tempAllEmailsOfUsers.push(userData.email);
        }
      });
      setAllEmailsOfUsers(tempAllEmailsOfUsers);
      setCompleteVerifyUser(true);
    }
  }, [usersData]);

  if (!completeVerifyUser && loadingCurrentDate) {
    return (
      <div className={classes.contentWrapper}>
        <CircularLoader />
      </div>
    );
  } else {
    if (user && user.email && allEmailsOfUsers.includes(user.email)) {
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

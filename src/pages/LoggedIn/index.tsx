import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import useStyles from "./styles";
import Home from "pages/Home";
import Tournament from "pages/Tournament";
import TournamentRating from "pages/TournamentRating";
import TournamentHistory from "pages/TournamentHistory";
import { Button, CircularProgress } from "@material-ui/core";
import { Context } from "index";
import { useObjectVal } from "react-firebase-hooks/database";
import { UserStruct } from "interfacesAndTypes";
import { EMAIL_DEFAULT_VALUE } from "utils/constants";
import firebase from "firebase";

interface LoggedInProps {
  user: firebase.User | null | undefined;
}

const LoggedIn = (props: LoggedInProps) => {
  const { user } = props;
  const classes = useStyles();
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allDataOfUsers, setAllDataOfUsers] = useState<UserStruct[]>([]);
  const [allEmailsOfUsers, setAllEmailsOfUsers] = useState<string[]>([]);

  const { database } = useContext(Context);

  // firebase refs
  const refUsers = database.ref("users");
  const [usersData, loadingUsersData] = useObjectVal<{
    [key: string]: UserStruct;
  }>(refUsers);

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
    }
  }, [usersData]);

  if (loadingUsersData) {
    return (
      <main className={classes.main}>
        <CircularProgress color="primary" />
      </main>
    );
  } else {
    if (user && user.email && allEmailsOfUsers.includes(user.email)) {
      return (
        <main className={classes.main}>
          <nav className={classes.nav}>
            <Button
              size="small"
              color="default"
              onClick={() => history.push("/tournament")}
            >
              Турнирная таблица
            </Button>
            <Button
              size="small"
              color="default"
              onClick={() => history.push("/tournament-rating")}
            >
              Рейтинг
            </Button>
            <Button
              size="small"
              color="default"
              onClick={() => history.push("/tournament-history")}
            >
              История турниров
            </Button>
          </nav>

          <article className={classes.content}>
            <Switch>
              <Route exact path="/tournament">
                <Tournament />
              </Route>
              <Route exact path="/tournament-rating">
                <TournamentRating />
              </Route>
              <Route exact path="/tournament-history">
                <TournamentHistory />
              </Route>
              <Redirect to="/tournament" />
            </Switch>
          </article>
        </main>
      );
    }

    return (
      <main className={classes.main}>
        <Home />
      </main>
    );
  }
};

export default LoggedIn;

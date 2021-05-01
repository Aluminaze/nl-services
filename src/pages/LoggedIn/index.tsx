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
import { EMAIL_DEFAULT_VALUE, WINNER_ID_DEF_VALUE } from "utils/constants";
import ActionLogsForYear from "pages/ActionLogsForYear";
import getCurrentDate from "utils/getCurrentDate";

// firebase
import firebase from "firebase/app";
import "firebase/database";

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
  const refTournaments = firebase.database().ref("tournaments");
  const refTournamentsPush = refTournaments.push();

  // firebase refs
  const refUsers = database.ref("users");
  const refCurrentDate = database.ref("currentDate");
  const [usersData, loadingUsersData] = useObjectVal<{
    [key: string]: UserStruct;
  }>(refUsers);
  const [currentDate, loadingCurrentDate] = useObjectVal<string>(
    refCurrentDate
  );
  const [disabledButton, setDisabledButton] = useState<boolean>(false);

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

  const createEventWithTournaments = () => {
    setDisabledButton(true);
    const dateNow: string = getCurrentDate();

    refTournaments
      .orderByChild("id")
      .equalTo(dateNow)
      .get()
      .then((snapshot) => {
        if (!snapshot.exists()) {
          refTournamentsPush.set({
            id: dateNow,
            time11: { winner: WINNER_ID_DEF_VALUE, participants: {} },
            time15: { winner: WINNER_ID_DEF_VALUE, participants: {} },
            time19: { winner: WINNER_ID_DEF_VALUE, participants: {} },
            time23: { winner: WINNER_ID_DEF_VALUE, participants: {} },
          });
        }
      });

    setTimeout(() => {
      refCurrentDate.set(dateNow);
      setDisabledButton(false);
    }, 1500);
  };

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
              onClick={() => history.push("/rating")}
            >
              Рейтинг
            </Button>
            <Button
              size="small"
              color="default"
              onClick={() => history.push("/history")}
            >
              История турниров
            </Button>
            <Button
              size="small"
              color="default"
              onClick={() => history.push("/action-logs")}
            >
              Журнал событий
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => createEventWithTournaments()}
              disabled={disabledButton}
            >
              Создать турнирную сетку
            </Button>
          </nav>

          <article className={classes.content}>
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

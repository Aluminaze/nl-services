import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import useStyles from "./styles";
import Home from "pages/Home";
import Tournament from "pages/Tournament";
import TournamentRating from "pages/TournamentRating";
import TournamentHistory from "pages/TournamentHistory";
import { Button, CircularProgress, ListItemText } from "@material-ui/core";
import { Context } from "index";
import { useObjectVal } from "react-firebase-hooks/database";
import { UserStruct } from "interfacesAndTypes";
import { EMAIL_DEFAULT_VALUE, WINNER_ID_DEF_VALUE } from "utils/constants";
import ActionLogsForYear from "pages/ActionLogsForYear";
import getCurrentDate from "utils/getCurrentDate";
import Divider from "@material-ui/core/Divider";
import StarIcon from "@material-ui/icons/Star";
import TimelineIcon from "@material-ui/icons/Timeline";
import HistoryIcon from "@material-ui/icons/History";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import EventNoteIcon from "@material-ui/icons/EventNote";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Hidden from "@material-ui/core/Hidden";

// firebase
import firebase from "firebase/app";
import "firebase/database";

interface INavData {
  title: string;
  doHistoryPush: string;
  icon: React.ReactNode;
}

const navData: INavData[] = [
  {
    title: "Турнирная таблица",
    doHistoryPush: "/tournament",
    icon: <EventNoteIcon fontSize="small" />,
  },
  {
    title: "Рейтинг",
    doHistoryPush: "/raiting",
    icon: <TimelineIcon fontSize="small" />,
  },
  {
    title: "История турниров",
    doHistoryPush: "/history",
    icon: <HistoryIcon fontSize="small" />,
  },
  {
    title: "Журнал событий",
    doHistoryPush: "/action-logs",
    icon: <ImportContactsIcon fontSize="small" />,
  },
];

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
  const [usersData, loadingUsersData] =
    useObjectVal<{
      [key: string]: UserStruct;
    }>(refUsers);
  const [currentDate, loadingCurrentDate] =
    useObjectVal<string>(refCurrentDate);
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
        <div className={classes.container}>
          <div className={classes.nav}>
            <div className={classes.navButtons}>
              <List>
                {navData.map((nav: INavData) => (
                  <ListItem
                    button
                    onClick={() => history.push(nav.doHistoryPush)}
                    key={nav.title}
                    classes={{ root: classes.listItem }}
                  >
                    {nav.icon}
                    <Hidden smDown>
                      <ListItemText
                        className={classes.listTitle}
                        primary={nav.title}
                      />
                    </Hidden>
                  </ListItem>
                ))}
              </List>

              <Divider />

              <List>
                <ListItem
                  button
                  onClick={() => createEventWithTournaments()}
                  disabled={disabledButton}
                  classes={{ root: classes.listItem }}
                >
                  <PostAddIcon fontSize="small" />
                  <Hidden smDown>
                    <ListItemText
                      className={classes.listTitle}
                      primary={"Создать турнирную сетку"}
                    />
                  </Hidden>
                </ListItem>
              </List>
            </div>
          </div>

          <main className={classes.main}>
            {/* <article className={classes.content}>
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
        </>
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

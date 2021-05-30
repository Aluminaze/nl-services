import React, { useContext, useState } from "react";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import TimelineIcon from "@material-ui/icons/Timeline";
import HistoryIcon from "@material-ui/icons/History";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import EventNoteIcon from "@material-ui/icons/EventNote";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { WINNER_ID_DEF_VALUE } from "utils/constants";
import { Context } from "index";

import getCurrentDate from "utils/getCurrentDate";

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
    doHistoryPush: "/rating",
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

interface TournamentsNavigationProps {
  handleDialogClose?: () => void;
}

const TournamentsNavigation = (
  props: TournamentsNavigationProps
): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { handleDialogClose } = props;
  const { database } = useContext(Context);
  const refTournaments = firebase.database().ref("tournaments");
  const refTournamentsPush = refTournaments.push();
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const refCurrentDate = database.ref("currentDate");

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

  return (
    <div className={classes.nav}>
      <div className={classes.navButtons}>
        <List>
          {navData.map((nav: INavData) => (
            <ListItem
              button
              onClick={() => {
                history.push(nav.doHistoryPush);
                handleDialogClose && handleDialogClose();
              }}
              key={nav.title}
              classes={{ root: classes.listItem }}
            >
              {nav.icon}
              <ListItemText className={classes.listTitle} primary={nav.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              createEventWithTournaments();
              handleDialogClose && handleDialogClose();
            }}
            disabled={disabledButton}
            classes={{ root: classes.listItem }}
          >
            <PostAddIcon fontSize="small" />
            <ListItemText
              className={classes.listTitle}
              primary={"Создать турнирную сетку"}
            />
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default TournamentsNavigation;

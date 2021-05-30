import React from "react";
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
import Hidden from "@material-ui/core/Hidden";

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
  createEventWithTournaments: () => void;
  disabledButton: boolean;
}

const TournamentsNavigation = (
  props: TournamentsNavigationProps
): JSX.Element => {
  const classes = useStyles();
  const { createEventWithTournaments, disabledButton } = props;
  const history = useHistory();

  return (
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
  );
};

export default TournamentsNavigation;

import React, { useState } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import useStyles from "./styles";
import Home from "pages/Home";
import Tournament from "pages/Tournament";
import TournamentRating from "pages/TournamentRating";
import TournamentHistory from "pages/TournamentHistory";
import { Button } from "@material-ui/core";

const LoggedIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const [hasAccess] = useState<boolean>(true);

  if (hasAccess) {
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
};

export default LoggedIn;

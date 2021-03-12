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
      <article className={classes.content}>
        <nav className={classes.nav}>
          <Button
            size="small"
            color="default"
            onClick={() => history.push("/tournament")}
          >
            Создать турнир
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

        <section className={classes.container}>
          <Switch>
            <Route path="/tournament">
              <Tournament />
            </Route>
            <Route path="/tournament-rating">
              <TournamentRating />
            </Route>
            <Route path="/tournament-history">
              <TournamentHistory />
            </Route>
            <Redirect to="/tournament" />
          </Switch>
        </section>
      </article>
    );
  }

  return (
    <article className={classes.content}>
      <Home />
    </article>
  );
};

export default LoggedIn;

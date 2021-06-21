import React from "react";
import useStyles from "./style";
import Button from "@material-ui/core/Button";
import { Switch, Route, Redirect } from "react-router-dom";
import CircularLoader from "components/CircularLoader";

interface LogInProps {
  appInitCompleted: boolean;
  logIn: () => void;
}

const LogIn = (props: LogInProps) => {
  const { appInitCompleted, logIn } = props;
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <article className={classes.content}>
        <Switch>
          <Route exact path="/">
            {appInitCompleted ? (
              <section className={classes.authBlock}>
                <div className={classes.authBlockHeader}>
                  <h1>Для начала работы</h1>
                  <h1>используйте аккаунт Google</h1>
                </div>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={logIn}
                >
                  Войти
                </Button>
              </section>
            ) : (
              <CircularLoader />
            )}
          </Route>

          <Redirect to="/" />
        </Switch>
      </article>
    </main>
  );
};

export default LogIn;

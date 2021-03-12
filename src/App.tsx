import React, { useState } from "react";
import SignIn from "pages/SignIn";
import useStyles from "./styles";
import Home from "pages/Home";
import { Button } from "@material-ui/core";

function App() {
  const classes = useStyles();
  const [isAuth, setIsAuth] = useState<boolean>(true);

  return (
    <main className={classes.main}>
      {isAuth ? (
        <>
          <header className={classes.header}>
            <nav className={classes.headerNav}>
              <div className={classes.headerNavBtn}>
                <Button size="small" color="secondary">
                  Турниры
                </Button>
              </div>
              <div className={classes.headerNavBtn}>
                <Button size="small" color="secondary">
                  Осада Октала
                </Button>
              </div>
              <div className={classes.headerNavBtn}>
                <Button size="small" color="secondary">
                  Осада Форпоста
                </Button>
              </div>
            </nav>
            <Button
              size="small"
              color="secondary"
              onClick={() => setIsAuth(false)}
            >
              Выйти
            </Button>
          </header>
          <article className={classes.content}>
            <Home />
          </article>
        </>
      ) : (
        <>
          <header className={classes.header}>
            <h1 className={classes.headerLabel}>NL services</h1>
          </header>
          <article className={classes.content}>
            <SignIn setIsAuth={setIsAuth} />
          </article>
        </>
      )}
    </main>
  );
}

export default App;

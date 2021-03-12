import React from "react";
import useStyles from "./style";
import Button from "@material-ui/core/Button";

interface LogInProps {
  setIsAuthorized: (status: boolean) => void;
}

const LogIn = (props: LogInProps) => {
  const { setIsAuthorized } = props;
  const classes = useStyles();
  return (
    <article className={classes.content}>
      <section className={classes.container}>
        <div className={classes.authBlock}>
          <div className={classes.authBlockHeader}>
            <h1>Для начала работы</h1>
            <h1>используйте аккаунт Google</h1>
          </div>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setIsAuthorized(true)}
          >
            Войти
          </Button>
        </div>
      </section>
    </article>
  );
};

export default LogIn;

import React from "react";
import useStyles from "./style";
import Button from "@material-ui/core/Button";

interface SignInProps {
  setIsAuth: (status: boolean) => void;
}

const SignIn = (props: SignInProps) => {
  const { setIsAuth } = props;
  const classes = useStyles();
  return (
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
          onClick={() => setIsAuth(true)}
        >
          Войти
        </Button>
      </div>
    </section>
  );
};

export default SignIn;

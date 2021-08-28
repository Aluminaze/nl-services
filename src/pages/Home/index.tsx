import React from "react";
import useStyles from "./styles";

const Home = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.info}>
      <h1 className={classes.infoTitle}>
        Поздравляю, вы успешно авторизировались!
      </h1>
      <span className={classes.infoText}>
        Дождитесь пока администратор проекта откроет вам доступ
      </span>
    </div>
  );
};

export default Home;

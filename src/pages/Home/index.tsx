import React from "react";
import useStyles from "./styles";

interface HomeProps {
  hasAccess: boolean;
}

const Home = (props: HomeProps): JSX.Element => {
  const { hasAccess } = props;
  const classes = useStyles();

  return (
    <div className={classes.info}>
      {hasAccess ? (
        <>
          <h1 className={classes.label}>NLS</h1>
        </>
      ) : (
        <>
          <h1 className={classes.infoTitle}>
            Поздравляю, вы успешно авторизировались!
          </h1>
          <span className={classes.infoText}>
            Дождитесь пока администратор проекта откроет вам доступ
          </span>
        </>
      )}
    </div>
  );
};

export default Home;

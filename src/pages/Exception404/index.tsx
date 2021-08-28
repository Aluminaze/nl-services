import { ButtonBlack } from "components/Buttons";
import React from "react";
import { useHistory } from "react-router";
import useStyles from "./styles";

const Exception404 = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.info}>
      <h1 className={classes.infoTitle}>404</h1>
      <h2 className={classes.infoText}>Ошибка! Страница не найдена</h2>
      <div className={classes.infoButton}>
        <ButtonBlack
          label="Вернуться на гланую"
          onClick={() => history.push("/tournament")}
        />
      </div>
    </div>
  );
};

export default Exception404;

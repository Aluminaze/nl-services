import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import useStyles from "./styles";
import firebase from "firebase";

const ActionLogs = () => {
  const classes = useStyles();
  const database = firebase.database();
  const currentYear: number = new Date().getFullYear();

  // firebase refs
  const refActionLogs = database.ref("actionLogs" + currentYear);

  // firebase data
  const [actionLogs, loadtionActionLogs] = useObjectVal<{
    [key: string]: string;
  }>(refActionLogs.limitToLast(100));
  const actionLogsData: string[] = actionLogs
    ? Object.values(actionLogs).reverse()
    : [];

  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <h1>Журнал событий</h1>
      </header>

      {!loadtionActionLogs && (
        <div className={classes.listWrapper}>
          {actionLogsData?.length ? (
            <ul className={classes.list}>
              {actionLogsData.map((actionLog: string, index: number) => (
                <li key={index}>{actionLog}</li>
              ))}
            </ul>
          ) : (
            <ul className={classes.list}>
              <li>Записей нету</li>
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default ActionLogs;

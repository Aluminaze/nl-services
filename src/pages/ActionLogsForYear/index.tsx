import React, { useContext } from "react";
import { Context } from "index";
import { useObjectVal } from "react-firebase-hooks/database";
import useStyles from "./styles";

const ActionLogsForYear = () => {
  const classes = useStyles();
  const { database } = useContext(Context);
  const currentYear: number = new Date().getFullYear();

  // firebase refs
  const refActionLogsForYear = database.ref("actionLogs" + currentYear);

  // firebase data
  const [actionLogsForYear] = useObjectVal<{ [key: string]: string }>(
    refActionLogsForYear.limitToLast(100)
  );
  const actionLogsForYearData: string[] = actionLogsForYear
    ? Object.values(actionLogsForYear).reverse()
    : [];

  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <h1>Журнал событий</h1>
      </header>

      <div className={classes.listWrapper}>
        {actionLogsForYearData?.length ? (
          <ul className={classes.list}>
            {actionLogsForYearData.map((actionLog: string, index: number) => (
              <li key={index}>{actionLog}</li>
            ))}
          </ul>
        ) : (
          <ul className={classes.list}>
            <li>Записей нету</li>
          </ul>
        )}
      </div>
    </section>
  );
};

export default ActionLogsForYear;

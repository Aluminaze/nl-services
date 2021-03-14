import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import { Context } from "index";
import { useList } from "react-firebase-hooks/database";
import useStyles from "./styles";

const Tournament = () => {
  const classes = useStyles();
  const { database } = useContext(Context);
  const refTournaments = database.ref("tournaments");
  const refTorunamentPush = refTournaments.push();
  const [date, setDate] = useState<number>(1);

  const [snapshots] = useList(refTournaments);

  const addChild = (): void => {
    refTorunamentPush.set({
      id: `${date}/01/2020`,
      time11: { win: "id", glads: {} },
      time15: { win: "id", glads: {} },
      time19: { win: "id", glads: {} },
      time23: { win: "id", glads: {} },
    });
    setDate(date + 1);
  };

  const addUser = (dataSnapshot: any): void => {
    const { ref } = dataSnapshot;
    const add = ref.child("time11/glads").push();
    add.set({
      id: 1,
      count: 5,
    });
  };

  return (
    <section className={classes.container}>
      <Button onClick={addChild}>Add child</Button>
      <div className={classes.table}>
        {snapshots?.length && snapshots.length >= 2
          ? snapshots.map(
              (dataSnapshot: any, index: number) =>
                index < 2 && (
                  <div className={classes.tableCol} key={index}>
                    <h1>{dataSnapshot.val().id}</h1>

                    <div className={classes.tableColBlock}>
                      <h2>11:00</h2>
                      <div className={classes.list}>
                        {JSON.stringify(dataSnapshot.val().time11)}
                      </div>

                      <div className={classes.buttons}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => addUser(dataSnapshot)}
                        >
                          Добавить участника
                        </Button>
                      </div>
                    </div>
                    <div className={classes.tableColBlock}>
                      <h2>15:00</h2>
                      <div className={classes.list}>
                        {JSON.stringify(dataSnapshot.val().time15)}
                      </div>
                      <div className={classes.buttons}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                        >
                          Добавить участника
                        </Button>
                      </div>
                    </div>
                    <div className={classes.tableColBlock}>
                      <h2>19:00</h2>
                      <div className={classes.list}>
                        {JSON.stringify(dataSnapshot.val().time19)}
                      </div>
                      <div className={classes.buttons}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                        >
                          Добавить участника
                        </Button>
                      </div>
                    </div>
                    <div className={classes.tableColBlock}>
                      <h2>23:00</h2>
                      <div className={classes.list}>
                        {JSON.stringify(dataSnapshot.val().time23)}
                      </div>
                      <div className={classes.buttons}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                        >
                          Добавить участника
                        </Button>
                      </div>
                    </div>
                  </div>
                )
            )
          : null}
      </div>
    </section>
  );
};

export default Tournament;

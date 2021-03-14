import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import { Context } from "index";
import { useList } from "react-firebase-hooks/database";
import useStyles from "./styles";

type TournamentStruct = {
  id: string;
  time11: any;
  time15: any;
  time19: any;
  time23: any;
};

interface ParticipantStruct {
  id: string;
  count: number;
}

interface RenderParcipiantsProps {
  participiants: any;
}

const RenderParcipiants = (props: RenderParcipiantsProps) => {
  const { participiants } = props;
  const arr: ParticipantStruct[] = participiants
    ? Object.values(participiants)
    : [];
  console.log("~ arr", arr);

  if (arr.length) {
    return (
      <div>
        {arr.map((pars: ParticipantStruct) => (
          <div>
            {pars.id}: {pars.count}
          </div>
        ))}
      </div>
    );
  } else return null;
};

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
      time11: { win: "id", participiants: {} },
      time15: { win: "id", participiants: {} },
      time19: { win: "id", participiants: {} },
      time23: { win: "id", participiants: {} },
    });
    setDate(date + 1);
  };

  const addParticipiant = (dataSnapshot: any): void => {
    const { ref } = dataSnapshot;
    const add = ref.child("time11/participiants").push();
    add.set({
      id: "parcipId",
      count: 5,
    });
  };

  return (
    <section className={classes.container}>
      <Button onClick={addChild}>Add child</Button>
      <div className={classes.table}>
        {snapshots?.length && snapshots.length >= 2
          ? snapshots.map((dataSnapshot: any, index: number) => {
              const tournamentData: TournamentStruct = dataSnapshot.val();

              if (index < 2)
                return (
                  <div className={classes.tableCol} key={index}>
                    <h1>{tournamentData.id}</h1>

                    <div className={classes.tableColBlock}>
                      <h2>11:00</h2>
                      <div className={classes.list}>
                        <RenderParcipiants
                          participiants={tournamentData.time11?.participiants}
                        />
                      </div>

                      <div className={classes.buttons}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => addParticipiant(dataSnapshot)}
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
                );
              else return <span>null</span>;
            })
          : null}
      </div>
    </section>
  );
};

export default Tournament;

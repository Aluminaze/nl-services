import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import { Context } from "index";
import { useList } from "react-firebase-hooks/database";
import useStyles from "./styles";
import ParticipantAddingForm from "components/ParticipantAddingForm";
import { TournamentStruct } from "interfaces";
import RenderParticipants from "components/RenderParticipants";

const Tournament = () => {
  const classes = useStyles();
  const { database } = useContext(Context);
  const refTournaments = database.ref("tournaments");
  const refTorunamentPush = refTournaments.push();
  const [date, setDate] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(true);

  const [snapshots] = useList(refTournaments);

  const addChild = (): void => {
    refTorunamentPush.set({
      id: `${date}/01/2020`,
      time11: { winner: "id", participants: {} },
      time15: { winner: "id", participants: {} },
      time19: { winner: "id", participants: {} },
      time23: { winner: "id", participants: {} },
    });
    setDate(date + 1);
  };

  const addNewParcipant = (dataSnapshot: any): void => {
    const { ref } = dataSnapshot;
    const add = ref.child("time11/participants").push();
    add.set({
      id: "participantId",
      count: 5,
    });
  };

  return (
    <section className={classes.container}>
      <Button onClick={addChild}>Add child</Button>
      <div className={classes.table}>
        {snapshots?.length
          ? snapshots.map((dataSnapshot, index: number) => {
              const tournamentData: TournamentStruct = dataSnapshot.val();

              if (index < 1)
                return (
                  <div className={classes.tableContainer} key={index}>
                    <h1>{tournamentData.id}</h1>

                    <div className={classes.tableBlock}>
                      <div className={classes.tableBlockInfo}>
                        <h2>11:00</h2>
                        <div className={classes.list}>
                          <RenderParticipants
                            participants={tournamentData.time11?.participants}
                          />
                        </div>
                      </div>

                      <div className={classes.tableBlockButtons}>
                        {isAdding ? (
                          <div className={classes.tableBlockAdding}>
                            <ParticipantAddingForm setIsAdding={setIsAdding} />
                          </div>
                        ) : (
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={() => setIsAdding(true)}
                          >
                            Добавить участника
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              else return null;
            })
          : null}
      </div>
    </section>
  );
};

export default Tournament;

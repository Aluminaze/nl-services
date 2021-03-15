import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import { Context } from "index";
import { useList, useObjectVal } from "react-firebase-hooks/database";
import useStyles from "./styles";
import ParticipantAddingForm from "components/ParticipantAddingForm";
import { TournamentStruct, UserStruct } from "interfaces";
import RenderParticipants from "components/RenderParticipants";

const Tournament = () => {
  const classes = useStyles();
  const { database } = useContext(Context);
  const [isAdding, setIsAdding] = useState<boolean>(true);
  const [date, setDate] = useState<number>(1);

  // firebase refs
  const refTournaments = database.ref("tournaments");
  const refTorunamentPush = refTournaments.push();
  const refUsers = database.ref("users");

  // firebase data
  const [usersData] = useObjectVal<{ [key: string]: UserStruct }>(refUsers);
  const [tournaments] = useList(refTournaments);

  const userNames: string[] = usersData
    ? Object.values(usersData).map((user: UserStruct) => user.name)
    : [];
  const usersValData: UserStruct[] = usersData ? Object.values(usersData) : [];

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

  const addNewParticipant = (
    refTournamentsData: any,
    userName: string,
    count: number
  ): void => {
    const refParticipants = refTournamentsData
      .child("time11/participants")
      .push();

    if (usersData && Object.values(usersData).length) {
      const usersValData = Object.values(usersData);
      const selectedUserStruct: UserStruct | undefined = usersValData.find(
        (user: UserStruct) => user.name === userName
      );

      if (selectedUserStruct) {
        console.log(
          `Добавлен участник: userId: ${selectedUserStruct.id}, count: ${count}`
        );

        refParticipants.set({
          id: selectedUserStruct.id,
          count,
        });
      } else {
        //
        // TODO: Реализовать отладку ошибок и логирование
        //
        alert(
          "Ошибка при добавлении нового участника! Сообщите администратору проекта."
        );
      }
    }
  };

  return (
    <section className={classes.container}>
      <Button onClick={addChild}>Add child</Button>
      <div className={classes.table}>
        {tournaments?.length
          ? tournaments.map((tournamentsData, index: number) => {
              const tournamentData: TournamentStruct = tournamentsData.val();

              if (index < 1)
                return (
                  <div className={classes.tableContainer} key={index}>
                    <h1>{tournamentData.id}</h1>

                    <div className={classes.tableBlock}>
                      <div className={classes.tableBlockInfo}>
                        <h2>11:00</h2>
                        <div className={classes.list}>
                          <RenderParticipants
                            refTournamentsData={tournamentsData.ref}
                            usersValData={usersValData}
                            participants={tournamentData.time11?.participants}
                          />
                        </div>
                      </div>

                      <div className={classes.tableBlockButtons}>
                        {isAdding ? (
                          <div className={classes.tableBlockAdding}>
                            <ParticipantAddingForm
                              refTournamentsData={tournamentsData.ref}
                              userNames={userNames}
                              setIsAdding={setIsAdding}
                              addNewParticipant={addNewParticipant}
                            />
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

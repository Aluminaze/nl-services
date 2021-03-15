import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ParticipantAddingForm from "components/ParticipantAddingForm";
import RenderParticipants from "components/RenderParticipants";
import useStyles from "./styles";
import { ParticipantsStruct, UserStruct } from "interfaces";
import { Val } from "react-firebase-hooks/database/dist/database/types";

interface TournamentAtTimeProps {
  timeKey: "time11" | "time15" | "time19" | "time23";
  tournamentsData: any;
  usersValData: UserStruct[];
  participants: ParticipantsStruct;
  userNames: string[];
  usersData: Val<{ [key: string]: UserStruct }> | undefined;
}

const TournamentAtTime = (props: TournamentAtTimeProps) => {
  const {
    timeKey,
    tournamentsData,
    usersValData,
    participants,
    userNames,
    usersData,
  } = props;
  const classes = useStyles();

  const [isAdding, setIsAdding] = useState<boolean>(true);

  const addNewParticipant = (
    refTournamentsData: any,
    userName: string,
    count: number
  ): void => {
    const refParticipants = refTournamentsData
      .child(`${timeKey}/participants`)
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
    <div className={classes.tableBlock}>
      <div className={classes.tableBlockInfo}>
        <h2>Время турнира: 11:00</h2>
        <div className={classes.list}>
          <RenderParticipants
            refTournamentsData={tournamentsData.ref}
            usersValData={usersValData}
            participants={participants}
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
  );
};

export default TournamentAtTime;

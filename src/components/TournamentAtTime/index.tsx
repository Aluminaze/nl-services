import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ParticipantAddingForm from "components/ParticipantAddingForm";
import RenderParticipants from "components/RenderParticipants";
import useStyles from "./styles";
import {
  ParticipantsStruct,
  TimeKeyStruct,
  UserStruct,
} from "interfacesAndTypes";
import { Val } from "react-firebase-hooks/database/dist/database/types";
import getTimeByTimeKey from "utils/getTimeByTimeKey";

interface TournamentAtTimeProps {
  timeKey: TimeKeyStruct;
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

  const deleteParticipant = (userId: string, refTournamentsData: any): void => {
    let childKey: string = "";
    const refParticipants = refTournamentsData.child(`${timeKey}/participants`);

    refParticipants
      .orderByChild("id")
      .equalTo(userId)
      .on("value", function (snapshot: any) {
        snapshot.forEach(function (data: any) {
          childKey = data.key;
        });
      });

    if (childKey) {
      refParticipants.child(childKey).remove();
    } else {
      //
      // TODO: Реализовать отладку ошибок и логирование
      //
      alert(`Ошибка при удалении участника с ID: ${userId}`);
    }
  };

  return (
    <div className={classes.tableBlock}>
      <div className={classes.tableBlockInfo}>
        <h2>Время турнира: {getTimeByTimeKey(timeKey)}</h2>
        <div className={classes.list}>
          <RenderParticipants
            refTournamentsData={tournamentsData.ref}
            usersValData={usersValData}
            participants={participants}
            deleteParticipant={deleteParticipant}
          />
        </div>
      </div>

      <div className={classes.tableBlockButtons}>
        {isAdding ? (
          <div className={classes.tableBlockAdding}>
            <ParticipantAddingForm
              timeKey={timeKey}
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
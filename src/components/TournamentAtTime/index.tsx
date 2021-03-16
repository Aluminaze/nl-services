import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import ParticipantAddingForm from "components/ParticipantAddingForm";
import RenderParticipants from "components/RenderParticipants";
import useStyles from "./styles";
import {
  ParticipantsStruct,
  TimeKeyStruct,
  UserStruct,
} from "interfacesAndTypes";
import getTimeByTimeKey from "utils/getTimeByTimeKey";
import { Context } from "index";
import { useObjectVal } from "react-firebase-hooks/database";

interface TournamentAtTimeProps {
  timeKey: TimeKeyStruct;
  tournamentsData: any;
  participants: ParticipantsStruct;
}

const ACTION_TYPE_ADD: string = "ADD";
const ACTION_TYPE_REDUCE: string = "REDUCE";

const TournamentAtTime = (props: TournamentAtTimeProps) => {
  const { timeKey, tournamentsData, participants } = props;
  const classes = useStyles();
  const { database } = useContext(Context);
  const [isAdding, setIsAdding] = useState<boolean>(true);

  // firebase refs
  const refUsers = database.ref("users");

  // firebase data
  const [usersData] = useObjectVal<{ [key: string]: UserStruct }>(refUsers);
  const userNames: string[] = usersData
    ? Object.values(usersData).map((user: UserStruct) => user.name)
    : [];
  const usersValData: UserStruct[] = usersData ? Object.values(usersData) : [];

  const updateUserScore = (
    actionType: string,
    userId: string,
    count: number
  ): void => {
    let key: string = "";
    let currentScore: number = 0;

    refUsers
      .orderByChild("id")
      .equalTo(userId)
      .on("value", function (snapshot: any) {
        snapshot.forEach(function (data: any) {
          key = data.key;
          currentScore = data.val().score;
        });
      });

    if (key) {
      if (actionType === ACTION_TYPE_ADD) {
        if (currentScore === 0) {
          refUsers.child(key).child("score").set(count);
        } else {
          refUsers
            .child(key)
            .child("score")
            .set(currentScore + count, (error) => {
              if (error) {
                console.error(
                  `Ошибка при обновлении счета участника с ID: ${userId}`
                );
                alert(`Ошибка при обновлении счета участника с ID: ${userId}`);
              } else {
                console.log(
                  `Участнику с ID: ${userId}, успешно добавлены очки в кол-ве ${count} ед.`
                );
              }
            });
        }
      } else if (actionType === ACTION_TYPE_REDUCE) {
        refUsers
          .child(key)
          .child("score")
          .set(currentScore - count, (error) => {
            if (error) {
              console.error(
                `Ошибка при обновлении счета участника с ID: ${userId}`
              );
              alert(`Ошибка при обновлении счета участника с ID: ${userId}`);
            } else {
              console.log(
                `Участнику с ID: ${userId}, убраны очки в кол-ве ${count} ед.`
              );
            }
          });
      }
    } else {
      console.error(
        `Ошибка! При удалении участника ID: ${userId}, ключ участника не был найден!`
      );
      alert(
        `Ошибка! При обновлении счета участника произошла ошибка, сообщите об этом администратору!`
      );
    }
  };

  const addNewParticipant = (
    refTournamentsData: any,
    userName: string,
    count: number
  ): void => {
    const refParticipants = refTournamentsData
      .child(`${timeKey}/participants`)
      .push();

    if (usersValData.length) {
      const selectedUserStruct: UserStruct | undefined = usersValData.find(
        (user: UserStruct) => user.name === userName
      );

      if (selectedUserStruct) {
        refParticipants.set(
          {
            id: selectedUserStruct.id,
            count,
          },
          (error: any) => {
            if (error) {
              console.error(`Ошибка при добавлении нового участника! ${error}`);
              alert(
                "Ошибка при добавлении нового участника! Сообщите администратору проекта."
              );
            } else {
              console.log(
                `Добавлен участник: userId: ${selectedUserStruct.id}, count: ${count}`
              );

              updateUserScore(ACTION_TYPE_ADD, selectedUserStruct.id, count);
            }
          }
        );
      } else {
        //
        // TODO: Реализовать отладку ошибок и логирование
        //
        alert(
          `Ошибка при добавлении нового участника! Не найден участник с именем ${userName}`
        );
      }
    }
  };

  const deleteParticipant = (userId: string, refTournamentsData: any): void => {
    let childKey: string = "";
    let currentCount: number = 0;
    const refParticipants = refTournamentsData.child(`${timeKey}/participants`);

    refParticipants
      .orderByChild("id")
      .equalTo(userId)
      .on("value", function (snapshot: any) {
        snapshot.forEach(function (data: any) {
          currentCount = data.val().count;
          childKey = data.key;
        });
      });

    if (childKey) {
      refParticipants.child(childKey).remove();

      updateUserScore(ACTION_TYPE_REDUCE, userId, currentCount);
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
        <ul className={classes.list}>
          <RenderParticipants
            refTournamentsData={tournamentsData.ref}
            usersValData={usersValData}
            participants={participants}
            deleteParticipant={deleteParticipant}
          />
        </ul>
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

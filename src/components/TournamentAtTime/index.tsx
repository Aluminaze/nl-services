import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ParticipantAddingForm from "components/ParticipantAddingForm";
import RenderParticipants from "components/RenderParticipants";
import useStyles from "./styles";
import {
  ParticipantInfoStruct,
  ParticipantsStruct,
  TimeKeyStruct,
  UserStruct,
} from "interfacesAndTypes";
import getTimeByTimeKey from "utils/getTimeByTimeKey";
import { Context } from "index";
import { useObjectVal } from "react-firebase-hooks/database";
import { MAX_SUM_OF_COUNTS, WINNER_ID_DEF_VALUE } from "utils/constants";
import getUserNameById from "utils/getUserNameById";

interface TournamentAtTimeProps {
  timeKey: TimeKeyStruct;
  tournamentsData: any;
  participants: ParticipantsStruct;
}

const ACTION_TYPE_ADD: string = "ADD";
const ACTION_TYPE_REDUCE: string = "REDUCE";

const ACTION_LOG_TYPE_ADD: string = "ADD";
const ACTION_LOG_TYPE_DELETE: string = "DELETE";
const ACTION_LOG_TYPE_SET_WINNER: string = "SET_WINNER";
const ACTION_LOG_TYPE_UNSET_WINNER: string = "UNSET_WNNER";

const TournamentAtTime = (props: TournamentAtTimeProps) => {
  const { timeKey, tournamentsData, participants } = props;
  const classes = useStyles();
  const { database, auth } = useContext(Context);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [selectedParticipantNames, setSelectedParticipantNames] = useState<
    string[]
  >([]);
  const [sumOfCounts, setSumOfCounts] = useState<number>(0);

  // firebase refs
  const refUsers = database.ref("users");
  const refWinner = tournamentsData.ref.child(`${timeKey}/winner`);

  // firebase data
  const [usersData] = useObjectVal<{ [key: string]: UserStruct }>(refUsers);
  const [winnerId] = useObjectVal<string>(refWinner);
  const allUserNames: string[] = usersData
    ? Object.values(usersData).map((user: UserStruct) => user.name)
    : [];
  const usersValData: UserStruct[] = usersData ? Object.values(usersData) : [];

  useEffect(() => {
    if (participants) {
      const tempSum: number = Object.values(participants).reduce(
        (sum: number, participantData: ParticipantInfoStruct) =>
          sum + participantData.count,
        0
      );

      setSumOfCounts(tempSum);
    }
  }, [participants]);

  //
  // NOTE: Данный хук создает массив с именнами участников турнира
  //
  useEffect(() => {
    if (usersData && participants) {
      const tempSelectedNames: string[] = [];

      Object.values(participants).forEach(
        (participantData: ParticipantInfoStruct) => {
          const userData: UserStruct | undefined = Object.values(
            usersData
          ).find((user: UserStruct) => user.id === participantData.id);
          if (userData) {
            tempSelectedNames.push(userData.name);
          }
        }
      );

      setSelectedParticipantNames(tempSelectedNames);
    }
  }, [participants, usersData]);

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

  const addNewParticipant = (userName: string, count: number): void => {
    const refParticipants = tournamentsData.ref
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

              addActionLog(ACTION_LOG_TYPE_ADD, userName, count);
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

  const deleteParticipant = (userId: string): void => {
    let childKey: string = "";
    let currentCount: number = 0;
    const refParticipants = tournamentsData.ref.child(
      `${timeKey}/participants`
    );

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
      addActionLog(ACTION_LOG_TYPE_DELETE, userId, currentCount);
      updateUserScore(ACTION_TYPE_REDUCE, userId, currentCount);
    } else {
      //
      // TODO: Реализовать отладку ошибок и логирование
      //
      alert(`Ошибка при удалении участника с ID: ${userId}`);
    }
  };

  const setWinner = (userId: string): void => {
    if (winnerId === userId) {
      // NOTE: Здесь реализована логика когда решили поменять победителя
      refWinner.set(WINNER_ID_DEF_VALUE);
      addActionLog(ACTION_LOG_TYPE_UNSET_WINNER, userId, MAX_SUM_OF_COUNTS);
      updateUserScore(ACTION_TYPE_ADD, userId, MAX_SUM_OF_COUNTS);
    } else {
      // NOTE: Здесь реализована логика когда выбирают победителя
      refWinner.set(userId);
      addActionLog(ACTION_LOG_TYPE_SET_WINNER, userId, MAX_SUM_OF_COUNTS);
      updateUserScore(ACTION_TYPE_ADD, userId, -MAX_SUM_OF_COUNTS);
    }
  };

  const addActionLog = (
    actionType: string,
    userNameOrId: string,
    count: number
  ): void => {
    const refParticipants = tournamentsData.ref
      .child(`${timeKey}/actionLogs`)
      .push();
    const currentDate: string = new Date().toLocaleDateString("en-US", {
      timeZone: "Europe/Minsk",
    });
    const currentTime: string = new Date().toLocaleTimeString("en-US", {
      timeZone: "Europe/Minsk",
    });

    if (usersValData) {
      const findedUser: UserStruct | undefined = usersValData.find(
        (userData: UserStruct) => userData.email === auth.currentUser?.email
      );

      if (findedUser) {
        if (actionType === ACTION_LOG_TYPE_ADD) {
          refParticipants.set(
            `[${currentDate} ${currentTime}] ${findedUser.name} добавил участника ${userNameOrId} [+${count}]`
          );
        } else if (actionType === ACTION_LOG_TYPE_DELETE) {
          refParticipants.set(
            `[${currentDate} ${currentTime}] ${
              findedUser.name
            } удалил участника ${getUserNameById(
              userNameOrId,
              usersValData
            )} [-${count}]`
          );
        } else if (actionType === ACTION_LOG_TYPE_SET_WINNER) {
          refParticipants.set(
            `[${currentDate} ${currentTime}] ${
              findedUser.name
            } выбрал победителя турнира -> ${getUserNameById(
              userNameOrId,
              usersValData
            )}`
          );
        } else if (actionType === ACTION_LOG_TYPE_UNSET_WINNER) {
          refParticipants.set(
            `[${currentDate} ${currentTime}] ${
              findedUser.name
            } убрал победителя турнира -> ${getUserNameById(
              userNameOrId,
              usersValData
            )}`
          );
        }
      }
    }
  };

  return (
    <div className={classes.tableBlock}>
      <div className={classes.tableBlockInfo}>
        <h2>Время турнира: {getTimeByTimeKey(timeKey)}</h2>
        <ul className={classes.list}>
          <RenderParticipants
            timeKey={timeKey}
            usersValData={usersValData}
            participants={participants}
            winnerId={winnerId}
            setWinner={setWinner}
            deleteParticipant={deleteParticipant}
          />
        </ul>
      </div>

      {sumOfCounts < MAX_SUM_OF_COUNTS && (
        <div className={classes.tableBlockActions}>
          {isAdding ? (
            <div className={classes.tableBlockAdding}>
              <ParticipantAddingForm
                timeKey={timeKey}
                allUserNames={allUserNames}
                selectedParticipantNames={selectedParticipantNames}
                sumOfCounts={sumOfCounts}
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
      )}
    </div>
  );
};

export default TournamentAtTime;

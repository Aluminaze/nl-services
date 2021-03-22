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
import InfoIcon from "@material-ui/icons/Info";
import ActionLogsDialog from "components/Dialogs/ActionLogsDialog";
import getCurrentDate from "utils/getCurrentDate";

interface TournamentAtTimeProps {
  tournamentDateId: string;
  timeKey: TimeKeyStruct;
  tournamentSnapshot: any;
  participants: ParticipantsStruct;
}

const ACTION_TYPE_ADD: string = "ADD";
const ACTION_TYPE_REDUCE: string = "REDUCE";

const ACTION_LOG_TYPE_ADD: string = "ADD";
const ACTION_LOG_TYPE_DELETE: string = "DELETE";
const ACTION_LOG_TYPE_SET_WINNER: string = "SET_WINNER";
const ACTION_LOG_TYPE_UNSET_WINNER: string = "UNSET_WNNER";

const TournamentAtTime = (props: TournamentAtTimeProps) => {
  const { tournamentDateId, timeKey, tournamentSnapshot, participants } = props;
  const classes = useStyles();
  const { database, auth } = useContext(Context);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [selectedParticipantNames, setSelectedParticipantNames] = useState<
    string[]
  >([]);
  const [sumOfCounts, setSumOfCounts] = useState<number>(0);
  const [isOpenActionLogsDialog, setIsOpenActionLogsDialog] = useState<boolean>(
    false
  );

  // firebase refs
  const refUsers = database.ref("users");
  const refWinner = tournamentSnapshot.ref.child(`${timeKey}/winner`);
  const refActionLogs = tournamentSnapshot.ref.child(`${timeKey}/actionLogs`);

  // firebase data
  const [usersData] = useObjectVal<{ [key: string]: UserStruct }>(refUsers);
  const [winnerId] = useObjectVal<string>(refWinner);
  const [actionLogs] = useObjectVal<{ [key: string]: string }>(refActionLogs);
  const allUserNames: string[] = usersData
    ? Object.values(usersData).map((user: UserStruct) => user.name)
    : [];
  const usersValData: UserStruct[] = usersData ? Object.values(usersData) : [];
  const actionLogsData: string[] = actionLogs ? Object.values(actionLogs) : [];

  useEffect(() => {
    if (participants) {
      const tempSum: number = Object.values(participants).reduce(
        (sum: number, participantData: ParticipantInfoStruct) =>
          sum + participantData.count,
        0
      );

      setSumOfCounts(tempSum);
    } else {
      setSumOfCounts(0);
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
    } else {
      setSelectedParticipantNames([]);
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
    const refParticipants = tournamentSnapshot.ref
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
    const refParticipants = tournamentSnapshot.ref.child(
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
    const currentYear: number = new Date().getFullYear();
    // firebase refs
    const refParticipants = tournamentSnapshot.ref
      .child(`${timeKey}/actionLogs`)
      .push();
    const refActionLogsPush = database.ref("actionLogs" + currentYear).push();

    const currentDate: string = getCurrentDate();
    const currentTime: string = new Date().toLocaleTimeString("en-US", {
      timeZone: "Europe/Minsk",
    });

    if (usersValData) {
      const findedUser: UserStruct | undefined = usersValData.find(
        (userData: UserStruct) => userData.email === auth.currentUser?.email
      );

      if (findedUser) {
        const tournamentActionLog: string = `в турнире [${tournamentDateId} ${getTimeByTimeKey(
          timeKey
        )}]`;
        const actionTime: string = `[${currentDate} ${currentTime}]`;

        if (actionType === ACTION_LOG_TYPE_ADD) {
          const actionLog: string = `${findedUser.name} добавил участника ${userNameOrId} [+${count}]`;

          refParticipants.set(`${actionTime} ${actionLog}`);
          refActionLogsPush.set(
            `${actionTime} ${tournamentActionLog}: ${actionLog}`
          );
        } else if (actionType === ACTION_LOG_TYPE_DELETE) {
          const actionLog: string = `${
            findedUser.name
          } удалил участника ${getUserNameById(
            userNameOrId,
            usersValData
          )} [-${count}]`;

          refParticipants.set(`${actionTime} ${actionLog}`);
          refActionLogsPush.set(
            `${actionTime} ${tournamentActionLog}: ${actionLog}`
          );
        } else if (actionType === ACTION_LOG_TYPE_SET_WINNER) {
          const actionLog: string = `${
            findedUser.name
          } выбрал победителя турнира -> ${getUserNameById(
            userNameOrId,
            usersValData
          )}`;

          refParticipants.set(`${actionTime} ${actionLog}`);
          refActionLogsPush.set(
            `${actionTime} ${tournamentActionLog}: ${actionLog}`
          );
        } else if (actionType === ACTION_LOG_TYPE_UNSET_WINNER) {
          const actionLog: string = `${
            findedUser.name
          } убрал победителя турнира -> ${getUserNameById(
            userNameOrId,
            usersValData
          )}`;

          refParticipants.set(`${actionTime} ${actionLog}`);
          refActionLogsPush.set(
            `${actionTime} ${tournamentActionLog}: ${actionLog}`
          );
        }
      }
    }
  };

  return (
    <div className={classes.tableBlock}>
      <div className={classes.tableBlockInfo}>
        <div className={classes.tableBlockInfoHeader}>
          <div className={classes.tableBlockInfoHeaderElement}>
            <div
              className={classes.infoIconWrapper}
              onClick={() => setIsOpenActionLogsDialog(true)}
            >
              <InfoIcon color="primary" />
            </div>
            <h2>Время турнира: {getTimeByTimeKey(timeKey)}</h2>
          </div>
          <div className={classes.tableBlockInfoHeaderElement}>
            <h3>Количество участников: {sumOfCounts}</h3>
          </div>
        </div>
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
      <ActionLogsDialog
        isDialogOpen={isOpenActionLogsDialog}
        setIsDialogOpen={setIsOpenActionLogsDialog}
        actionLogsData={actionLogsData}
        date={"20/3/2021"}
        timeKey={timeKey}
      />
    </div>
  );
};

export default TournamentAtTime;

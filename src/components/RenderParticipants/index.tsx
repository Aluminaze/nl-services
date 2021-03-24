import React, { useEffect, useState } from "react";
import {
  ParticipantInfoStruct,
  ParticipantsStruct,
  UserStruct,
} from "interfacesAndTypes";
import getUserNameById from "utils/getUserNameById";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import useStyles from "./styles";
import clsx from "clsx";
import { WINNER_ID_DEF_VALUE } from "utils/constants";
import { useConfirm } from "material-ui-confirm";
import getTimeByTimeKey from "utils/getTimeByTimeKey";
import WarningIcon from "@material-ui/icons/Warning";

export interface RenderParticipantsProps {
  timeKey: string;
  usersValData: UserStruct[];
  participants: ParticipantsStruct;
  winnerId: string | undefined;
  disableWorkWithParticipants: boolean;
  deleteParticipant: (userId: string) => void;
  setWinner: (userId: string) => void;
}

const RenderParticipants = (props: RenderParticipantsProps) => {
  const {
    timeKey,
    usersValData,
    participants,
    winnerId,
    disableWorkWithParticipants,
    deleteParticipant,
    setWinner,
  } = props;
  const classes = useStyles();
  const participantsData: ParticipantInfoStruct[] = participants
    ? Object.values(participants)
    : [];
  const [hasWinner, setHasWinner] = useState<boolean>(false);
  const confirmDelete = useConfirm();

  const onSetWinner = (participantId: string) => {
    if (hasWinner) {
      confirmDelete({
        title: (
          <div className={classes.confirmTitle}>
            <WarningIcon color="error" />
            <span className={classes.confirmTitleText}>Внимание!</span>
          </div>
        ),
        description: (
          <span className={classes.confirmMessageText}>
            Турнирная таблица на <strong>{getTimeByTimeKey(timeKey)}</strong>
            <br />
            Текущий победитель турнира&nbsp;
            <strong>{getUserNameById(participantId, usersValData)}</strong>
            &nbsp;
            <br />
            Вы действетельно хотите поменять победителя турнира?
          </span>
        ),
        cancellationText: "Нет",
        confirmationText: "Да",
      }).then(() => {
        setWinner(participantId);
      });
    } else {
      setWinner(participantId);
    }
  };

  const onDeleteParticipant = (participantId: string) => {
    confirmDelete({
      title: (
        <div className={classes.confirmTitle}>
          <WarningIcon color="error" />
          <span className={classes.confirmTitleText}>Внимание!</span>
        </div>
      ),
      description: (
        <span className={classes.confirmMessageText}>
          Турнирная таблица на <strong>{getTimeByTimeKey(timeKey)}</strong>
          <br />
          Вы действительно хотите удалить&nbsp;
          <strong>{getUserNameById(participantId, usersValData)}</strong>&nbsp;
          из списка участников?
        </span>
      ),
      cancellationText: "Нет",
      confirmationText: "Да",
    }).then(() => {
      deleteParticipant(participantId);
    });
  };

  useEffect(() => {
    if (winnerId === WINNER_ID_DEF_VALUE) {
      setHasWinner(false);
    } else {
      setHasWinner(true);
    }
  }, [winnerId]);

  if (participantsData.length) {
    return (
      <>
        {participantsData.map(
          (participantData: ParticipantInfoStruct, index: number) => (
            <li className={classes.row} key={index}>
              <div
                className={clsx(
                  classes.rowText,
                  winnerId === participantData.id && classes.rowTextUnregular
                )}
              >
                <div className={classes.rowTextElement}>
                  <div className={classes.rowTextElementCheckbox}>
                    {hasWinner && winnerId === participantData.id && (
                      <div
                        className={classes.checkboxWrapper}
                        onClick={() => onSetWinner(participantData.id)}
                      >
                        <CheckBoxIcon color="secondary" />
                      </div>
                    )}
                    {!hasWinner && (
                      <div
                        className={classes.checkboxWrapper}
                        onClick={() => onSetWinner(participantData.id)}
                      >
                        <CheckBoxOutlineBlankIcon />
                      </div>
                    )}
                  </div>
                  <span
                    className={
                      winnerId === participantData.id
                        ? classes.textUnregular
                        : classes.textRegular
                    }
                  >
                    {getUserNameById(participantData.id, usersValData)}
                  </span>
                </div>
                <span
                  className={
                    winnerId === participantData.id
                      ? classes.textUnregular
                      : classes.textRegular
                  }
                >
                  {participantData.count}
                </span>
              </div>

              {winnerId !== participantData.id && !disableWorkWithParticipants && (
                <div
                  className={classes.iconWrapper}
                  onClick={() => onDeleteParticipant(participantData.id)}
                >
                  <HighlightOffIcon color="error" />
                </div>
              )}
            </li>
          )
        )}
      </>
    );
  }

  return null;
};

export default RenderParticipants;

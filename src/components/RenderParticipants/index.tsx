import React, { forwardRef, useEffect, useState } from "react";
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
import FlipMove from "react-flip-move";

export interface RenderParticipantsProps {
  timeKey: string;
  usersValData: UserStruct[];
  participants: ParticipantsStruct;
  winnerId: string | undefined;
  disableWorkWithParticipants: boolean;
  deleteParticipant: (userId: string) => void;
  setWinner: (userId: string) => void;
  unsetWinner: (userId: string) => void;
}

interface ParticipantProps {
  participantData: ParticipantInfoStruct;
  winnerId: string | undefined;
  hasWinner: boolean;
  usersValData: UserStruct[];
  disableWorkWithParticipants: boolean;
  onSetWinner: (id: string) => void;
  onDeleteParticipant: (id: string) => void;
}

const Participant = forwardRef((props: ParticipantProps, ref: any) => {
  const classes = useStyles();
  const {
    participantData,
    winnerId,
    hasWinner,
    usersValData,
    disableWorkWithParticipants,
    onSetWinner,
    onDeleteParticipant,
  } = props;
  return (
    <li className={classes.row} key={participantData.id} ref={ref}>
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
            className={clsx(
              classes.text,
              winnerId === participantData.id
                ? classes.textUnregular
                : classes.textRegular
            )}
          >
            {getUserNameById(participantData.id, usersValData)}
          </span>
        </div>
        <span
          className={clsx(
            classes.text,
            winnerId === participantData.id
              ? classes.textUnregular
              : classes.textRegular
          )}
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
  );
});

const RenderParticipants = (props: RenderParticipantsProps) => {
  const {
    timeKey,
    usersValData,
    participants,
    winnerId,
    disableWorkWithParticipants,
    deleteParticipant,
    setWinner,
    unsetWinner,
  } = props;
  const classes = useStyles();
  const participantsData: ParticipantInfoStruct[] = participants
    ? Object.values(participants)
    : [];
  const [hasWinner, setHasWinner] = useState<boolean>(false);
  const confirmDelete = useConfirm();

  const onSetWinner = (participantId: string): void => {
    if (hasWinner) {
      confirmDelete({
        title: (
          <div className={classes.confirmTitle}>
            <WarningIcon color="error" />
            <span className={classes.confirmTitleText}>????????????????!</span>
          </div>
        ),
        description: (
          <span className={classes.confirmMessageText}>
            ?????????????????? ?????????????? ???? <strong>{getTimeByTimeKey(timeKey)}</strong>
            <br />
            ?????????????? ???????????????????? ??????????????&nbsp;
            <strong>{getUserNameById(participantId, usersValData)}</strong>
            &nbsp;
            <br />
            ???? ?????????????????????????? ???????????? ???????????????? ???????????????????? ???????????????
          </span>
        ),
        cancellationText: "??????",
        confirmationText: "????",
      }).then(() => {
        unsetWinner(participantId);
      });
    } else {
      setWinner(participantId);
    }
  };

  const onDeleteParticipant = (participantId: string): void => {
    confirmDelete({
      title: (
        <div className={classes.confirmTitle}>
          <WarningIcon color="error" />
          <span className={classes.confirmTitleText}>????????????????!</span>
        </div>
      ),
      description: (
        <span className={classes.confirmMessageText}>
          ?????????????????? ?????????????? ???? <strong>{getTimeByTimeKey(timeKey)}</strong>
          <br />
          ???? ?????????????????????????? ???????????? ??????????????&nbsp;
          <strong>{getUserNameById(participantId, usersValData)}</strong>&nbsp;
          ???? ???????????? ?????????????????????
        </span>
      ),
      cancellationText: "??????",
      confirmationText: "????",
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

  return (
    <FlipMove>
      {participantsData.length ? (
        participantsData.map((participantData: ParticipantInfoStruct) => (
          <Participant
            key={participantData.id}
            participantData={participantData}
            usersValData={usersValData}
            winnerId={winnerId}
            hasWinner={hasWinner}
            disableWorkWithParticipants={disableWorkWithParticipants}
            onSetWinner={onSetWinner}
            onDeleteParticipant={onDeleteParticipant}
          />
        ))
      ) : (
        <div className={classes.rowBlanck}>???????????? ????????</div>
      )}
    </FlipMove>
  );
};

export default RenderParticipants;

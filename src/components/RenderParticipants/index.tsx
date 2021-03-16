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

export interface RenderParticipantsProps {
  usersValData: UserStruct[];
  participants: ParticipantsStruct;
  deleteParticipant: (userId: string) => void;
  winnerId: string | undefined;
  setWinner: (userId: string) => void;
}

const RenderParticipants = (props: RenderParticipantsProps) => {
  const {
    usersValData,
    participants,
    deleteParticipant,
    winnerId,
    setWinner,
  } = props;
  const classes = useStyles();
  const participantsData: ParticipantInfoStruct[] = participants
    ? Object.values(participants)
    : [];
  const [hasWinner, setHasWinner] = useState<boolean>(false);

  useEffect(() => {
    if (winnerId === "unknown") {
      setHasWinner(false);
    } else {
      setHasWinner(true);
    }
  }, [winnerId]);

  const onClickCheckbox = (participantId: string) => {
    setWinner(participantId);
  };

  console.log(`render`);

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
                        onClick={() => onClickCheckbox(participantData.id)}
                      >
                        <CheckBoxIcon color="secondary" />
                      </div>
                    )}
                    {!hasWinner && (
                      <div
                        className={classes.checkboxWrapper}
                        onClick={() => onClickCheckbox(participantData.id)}
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

              {winnerId !== participantData.id && (
                <div
                  className={classes.iconWrapper}
                  onClick={() => deleteParticipant(participantData.id)}
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

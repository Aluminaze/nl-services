import React, { useState } from "react";
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
}

const RenderParticipants = (props: RenderParticipantsProps) => {
  const { usersValData, participants, deleteParticipant } = props;
  const classes = useStyles();
  const [winnerId, setWinnerId] = useState<string>("");

  const participantsData: ParticipantInfoStruct[] = participants
    ? Object.values(participants)
    : [];

  const onClickCheckbox = (participantId: string) => {
    if (winnerId) {
      setWinnerId("");
    } else {
      setWinnerId(participantId);
    }
  };

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
                    {winnerId === participantData.id ? (
                      <div
                        className={classes.checkboxWrapper}
                        onClick={() => onClickCheckbox(participantData.id)}
                      >
                        <CheckBoxIcon color="secondary" />
                      </div>
                    ) : winnerId ? null : (
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

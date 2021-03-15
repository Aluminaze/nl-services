import React from "react";
import {
  ParticipantInfoStruct,
  ParticipantsStruct,
  UserStruct,
} from "interfaces";
import getUserNameById from "utils/getUserNameById";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import useStyles from "./styles";

export interface RenderParticipantsProps {
  refTournamentsData: any;
  usersValData: UserStruct[];
  participants: ParticipantsStruct;
  deleteParticipant: (userId: string, refTournamentsData: any) => void;
}

const RenderParticipants = (props: RenderParticipantsProps) => {
  const {
    refTournamentsData,
    usersValData,
    participants,
    deleteParticipant,
  } = props;
  const classes = useStyles();

  const participantsData: ParticipantInfoStruct[] = participants
    ? Object.values(participants)
    : [];

  if (participantsData.length) {
    return (
      <>
        {participantsData.map(
          (participantData: ParticipantInfoStruct, index: number) => (
            <div className={classes.row} key={index}>
              <div className={classes.rowText}>
                <span className={classes.rowTextUserName}>
                  {getUserNameById(participantData.id, usersValData)}:
                </span>
                <span className={classes.rowTextCount}>
                  {participantData.count}
                </span>
              </div>
              <div
                className={classes.iconWrapper}
                onClick={() =>
                  deleteParticipant(participantData.id, refTournamentsData)
                }
              >
                <HighlightOffIcon color="error" />
              </div>
            </div>
          )
        )}
      </>
    );
  }

  return null;
};

export default RenderParticipants;

import React from "react";
import {
  ParticipantInfoStruct,
  ParticipantsStruct,
  UserStruct,
} from "interfaces";
import getUserNameById from "utils/getUserNameById";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import useStyles from "./styles";
import deleteParticipant from "./utils/deleteParticipant";

export interface RenderParticipantsProps {
  refTournamentsData: any;
  usersValData: UserStruct[];
  participants: ParticipantsStruct;
}

const RenderParticipants = (props: RenderParticipantsProps) => {
  const { refTournamentsData, usersValData, participants } = props;
  const classes = useStyles();
  const refParticipants = refTournamentsData.child("time11/participants");
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
                  deleteParticipant(participantData.id, refParticipants)
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

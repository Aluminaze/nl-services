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
}

const RenderParticipants = (props: RenderParticipantsProps) => {
  const { refTournamentsData, usersValData, participants } = props;
  const classes = useStyles();
  const refParticipants = refTournamentsData.child("time11/participants");

  const deletePaticipant = (userId: string): void => {
    let childKey: string = "";

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
                onClick={() => deletePaticipant(participantData.id)}
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

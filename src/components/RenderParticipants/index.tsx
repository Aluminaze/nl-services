import React from "react";
import {
  ParticipantInfoStruct,
  ParticipantsStruct,
  UserStruct,
} from "interfaces";
import getUserNameById from "utils/getUserNameById";

export interface RenderParticipantsProps {
  usersValData: UserStruct[];
  participants: ParticipantsStruct;
}

const RenderParticipants = (props: RenderParticipantsProps) => {
  const { usersValData, participants } = props;
  const arr: ParticipantInfoStruct[] = participants
    ? Object.values(participants)
    : [];

  if (arr.length) {
    return (
      <>
        {arr.map((aprticipantData: ParticipantInfoStruct, index: number) => (
          <div key={index}>
            {getUserNameById(aprticipantData.id, usersValData)}:{" "}
            {aprticipantData.count}
          </div>
        ))}
      </>
    );
  } else return null;
};

export default RenderParticipants;

import React from "react";
import {
  ParticipantInfoStruct,
  ParticipantsStruct,
  UserStruct,
} from "interfaces";

export interface RenderParticipantsProps {
  usersValData: UserStruct[];
  participants: ParticipantsStruct;
}

const RenderParticipants = (props: RenderParticipantsProps) => {
  const { usersValData, participants } = props;
  const arr: ParticipantInfoStruct[] = participants
    ? Object.values(participants)
    : [];

  const getUserNameById = (userId: string, usersData: UserStruct[]): string => {
    let name: string = "not found";

    if (usersValData.length) {
      const userData: UserStruct | undefined = usersValData.find(
        (user: UserStruct) => user.id === userId
      );

      if (userData) {
        name = userData.name;
      }
    }

    return name;
  };

  if (arr.length) {
    return (
      <>
        {arr.map((pars: ParticipantInfoStruct, index: number) => (
          <div key={index}>
            {getUserNameById(pars.id, usersValData)}: {pars.count}
          </div>
        ))}
      </>
    );
  } else return null;
};

export default RenderParticipants;

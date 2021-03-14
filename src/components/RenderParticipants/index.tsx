import React from "react";
import { ParticipantInfoStruct, RenderParticipantsProps } from "interfaces";

const RenderParticipants = (props: RenderParticipantsProps) => {
  const { participants } = props;
  const arr: ParticipantInfoStruct[] = participants
    ? Object.values(participants)
    : [];

  if (arr.length) {
    return (
      <>
        {arr.map((pars: ParticipantInfoStruct, index: number) => (
          <div key={index}>
            {pars.id}: {pars.count}
          </div>
        ))}
      </>
    );
  } else return null;
};

export default RenderParticipants;

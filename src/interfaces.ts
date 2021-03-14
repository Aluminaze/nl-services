import firebase from "firebase";

export interface ContextProps {
  auth: firebase.auth.Auth;
  database: firebase.database.Database;
}

export interface ParticipantInfoStruct {
  id: string;
  count: number;
}
export interface ParticipantsStruct {
  [key: string]: ParticipantInfoStruct;
}
export interface TournamentInTimeStruct {
  winner: string;
  participants: ParticipantsStruct;
}

export interface TournamentStruct {
  id: string;
  time11: TournamentInTimeStruct;
  time15: TournamentInTimeStruct;
  time19: TournamentInTimeStruct;
  time23: TournamentInTimeStruct;
}

export interface RenderParticipantsProps {
  participants: ParticipantsStruct;
}

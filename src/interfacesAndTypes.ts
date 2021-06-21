import {
  TIME_KEY_11,
  TIME_KEY_15,
  TIME_KEY_19,
  TIME_KEY_23,
} from "./utils/constants";

//
// INTERFACES
//
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

//
// TYPES
//
export type UserStruct = {
  id: string;
  name: string;
  score: number;
  email: string;
  tournaments: boolean;
  sieges: boolean;
};

export type TimeKeyStruct =
  | typeof TIME_KEY_11
  | typeof TIME_KEY_15
  | typeof TIME_KEY_19
  | typeof TIME_KEY_23;

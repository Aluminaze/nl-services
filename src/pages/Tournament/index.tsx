import React from "react";
import { useList } from "react-firebase-hooks/database";
import useStyles from "./styles";
import { TournamentStruct } from "interfacesAndTypes";
import TournamentAtTime from "components/TournamentAtTime";
import {
  TIME_KEY_11,
  TIME_KEY_15,
  TIME_KEY_19,
  TIME_KEY_23,
} from "utils/constants";
import CircularLoader from "components/CircularLoader";
import firebase from "firebase";

interface TournamentProps {
  currentDate: string;
  loadingCurrentDate: boolean;
}

const Tournament = (props: TournamentProps) => {
  const { currentDate, loadingCurrentDate } = props;
  const classes = useStyles();
  const database = firebase.database();

  // firebase refs
  const refTournaments = database.ref("tournaments");

  const [tournamentsAtDay, loadingTournamentsAtDay] = useList(
    refTournaments.orderByChild("id").equalTo(currentDate)
  );

  return (
    <section className={classes.container}>
      {!loadingTournamentsAtDay &&
      !loadingCurrentDate &&
      tournamentsAtDay?.length ? (
        tournamentsAtDay.map((tournamentSnapshot, index: number) => {
          const tournamentData: TournamentStruct = tournamentSnapshot.val();

          return (
            <div className={classes.table} key={index}>
              <div className={classes.tableContainer}>
                <h1>Текущая дата турнира: {tournamentData.id}</h1>

                <TournamentAtTime
                  tournamentDateId={currentDate}
                  timeKey={TIME_KEY_11}
                  tournamentSnapshot={tournamentSnapshot}
                  participants={tournamentData.time11?.participants}
                />
                <TournamentAtTime
                  tournamentDateId={currentDate}
                  timeKey={TIME_KEY_15}
                  tournamentSnapshot={tournamentSnapshot}
                  participants={tournamentData.time15?.participants}
                />
                <TournamentAtTime
                  tournamentDateId={currentDate}
                  timeKey={TIME_KEY_19}
                  tournamentSnapshot={tournamentSnapshot}
                  participants={tournamentData.time19?.participants}
                />
                <TournamentAtTime
                  tournamentDateId={currentDate}
                  timeKey={TIME_KEY_23}
                  tournamentSnapshot={tournamentSnapshot}
                  participants={tournamentData.time23?.participants}
                />
              </div>
            </div>
          );
        })
      ) : (
        <CircularLoader />
      )}
    </section>
  );
};

export default Tournament;

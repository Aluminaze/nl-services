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
import firebase from "firebase";

interface TournamentTableProps {
  date: string | null;
}

const TournamentTable = (props: TournamentTableProps): JSX.Element | null => {
  const { date } = props;
  const classes = useStyles();
  const database = firebase.database();

  // firebase refs
  const refTournaments = database.ref("tournaments");

  // firebase data
  const [tournamentsAtDay, loadingTournamentsAtDay] = useList(
    refTournaments.orderByChild("id").equalTo(date)
  );

  if (loadingTournamentsAtDay) {
    return null;
  }

  if (date) {
    if (tournamentsAtDay?.length) {
      return (
        <div className={classes.table}>
          {tournamentsAtDay.map((tournamentSnapshot, index: number) => {
            const tournamentData: TournamentStruct = tournamentSnapshot.val();

            return (
              <div className={classes.tableWrapper} key={index}>
                <div className={classes.tableContainer}>
                  <TournamentAtTime
                    tournamentDateId={date}
                    timeKey={TIME_KEY_11}
                    tournamentSnapshot={tournamentSnapshot}
                    participants={tournamentData.time11?.participants}
                  />
                  <TournamentAtTime
                    tournamentDateId={date}
                    timeKey={TIME_KEY_15}
                    tournamentSnapshot={tournamentSnapshot}
                    participants={tournamentData.time15?.participants}
                  />
                  <TournamentAtTime
                    tournamentDateId={date}
                    timeKey={TIME_KEY_19}
                    tournamentSnapshot={tournamentSnapshot}
                    participants={tournamentData.time19?.participants}
                  />
                  <TournamentAtTime
                    tournamentDateId={date}
                    timeKey={TIME_KEY_23}
                    tournamentSnapshot={tournamentSnapshot}
                    participants={tournamentData.time23?.participants}
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className={classes.info}>
        <h1 className={classes.infoTitle}>
          Турнир по введенной дате не найден!
        </h1>
      </div>
    );
  }

  return null;
};

export default TournamentTable;

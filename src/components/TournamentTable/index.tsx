import React, { useEffect, useState } from "react";
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
  const [tournamentSnapshot, setTournamentSnapshot] = useState<any>(null);
  const [tournamentData, setTournamentData] = useState<null | TournamentStruct>(
    null
  );
  const [isTableEmpty, setIsTableEmpty] = useState<boolean | null>(null);
  const refTournaments = database.ref("tournaments");
  const [tournamentsAtDay] = useList(
    refTournaments.orderByChild("id").equalTo(date)
  );

  useEffect(() => {
    if (tournamentsAtDay?.length) {
      setTournamentSnapshot(tournamentsAtDay[0]);
      setTournamentData(tournamentsAtDay[0].val());
    } else {
      setTournamentSnapshot(null);
      setTournamentData(null);
    }
  }, [tournamentsAtDay]);

  useEffect(() => {
    if (date) {
      refTournaments
        .orderByChild("id")
        .equalTo(date)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setIsTableEmpty(false);
          } else {
            setIsTableEmpty(true);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  if (isTableEmpty) {
    return (
      <div className={classes.info}>
        <h1 className={classes.infoTitle}>
          Турнир по введенной дате не найден!
        </h1>
      </div>
    );
  }

  if (date && tournamentSnapshot && tournamentData) {
    return (
      <div className={classes.table}>
        <div className={classes.tableWrapper}>
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
      </div>
    );
  }

  return null;
};

export default TournamentTable;

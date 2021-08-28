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
import TournamentDatePicker from "components/TournamentDatePicker";

const TournamentHistory = (): JSX.Element => {
  const classes = useStyles();

  const database = firebase.database();
  const [tournamentFullDate, setTournamentFullDate] = useState<Date | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string>("");

  // firebase refs
  const refTournaments = database.ref("tournaments");

  // firenase data
  const [tournamentsAtDay, loadingTournamentsAtDay] = useList(
    refTournaments.orderByChild("id").equalTo(selectedDate)
  );

  useEffect(() => {
    if (tournamentFullDate) {
      const date: number = tournamentFullDate.getDate();
      const mounth: number = tournamentFullDate.getMonth() + 1;
      const year: number = tournamentFullDate.getFullYear();
      const pickedDate: string = `${date}/${mounth}/${year}`;

      setSelectedDate(pickedDate);
    } else {
      setSelectedDate("");
    }
  }, [tournamentFullDate]);

  const handleDateChange = (date: Date | null) => {
    setTournamentFullDate(date);
  };

  return (
    <section className={classes.container}>
      <TournamentDatePicker
        date={tournamentFullDate}
        onChange={handleDateChange}
      />

      {selectedDate && !loadingTournamentsAtDay && (
        <div className={classes.table}>
          {tournamentsAtDay?.length ? (
            tournamentsAtDay.map((tournamentSnapshot, index: number) => {
              const tournamentData: TournamentStruct = tournamentSnapshot.val();

              return (
                <div className={classes.tableWrapper} key={index}>
                  <div className={classes.tableContainer}>
                    <TournamentAtTime
                      tournamentDateId={selectedDate}
                      timeKey={TIME_KEY_11}
                      tournamentSnapshot={tournamentSnapshot}
                      participants={tournamentData.time11?.participants}
                    />
                    <TournamentAtTime
                      tournamentDateId={selectedDate}
                      timeKey={TIME_KEY_15}
                      tournamentSnapshot={tournamentSnapshot}
                      participants={tournamentData.time15?.participants}
                    />
                    <TournamentAtTime
                      tournamentDateId={selectedDate}
                      timeKey={TIME_KEY_19}
                      tournamentSnapshot={tournamentSnapshot}
                      participants={tournamentData.time19?.participants}
                    />
                    <TournamentAtTime
                      tournamentDateId={selectedDate}
                      timeKey={TIME_KEY_23}
                      tournamentSnapshot={tournamentSnapshot}
                      participants={tournamentData.time23?.participants}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className={classes.tableInfo}>
              <h1>Турнир по введенной дате не найден!</h1>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default TournamentHistory;

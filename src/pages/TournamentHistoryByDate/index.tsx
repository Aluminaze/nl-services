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
import { useHistory, useParams } from "react-router";
import moment from "moment";

interface ParamProps {
  date: string;
}

const TournamentHistoryByDate = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { date } = useParams<ParamProps>();

  const database = firebase.database();
  const [tournamentFullDate, setTournamentFullDate] = useState<Date | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string>("");

  // firebase refs
  const refTournaments = database.ref("tournaments");

  // firebase data
  const [tournamentsAtDay, loadingTournamentsAtDay] = useList(
    refTournaments.orderByChild("id").equalTo(selectedDate)
  );

  //
  // Если дата корректна, то сохраняем ее в стейт
  //
  useEffect(() => {
    const momentDate = moment(date, "DD-MM-YYYY");

    if (momentDate.isValid()) {
      setTournamentFullDate(momentDate.toDate());
    }
  }, [date]);

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
    // setTournamentFullDate(date);
    if (date) {
      const dateAsString: string = moment(date).format("DD-MM-YYYY");
      history.push(`/history/${dateAsString}`);
    }
  };

  return (
    <section className={classes.container}>
      <h1>Is Valid Date:</h1>
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

export default TournamentHistoryByDate;

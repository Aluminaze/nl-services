import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import TournamentDatePicker from "components/TournamentDatePicker";
import { useHistory, useParams } from "react-router";
import moment from "moment";
import TournamentTable from "components/TournamentTable";

interface ParamProps {
  date: string;
}

const TournamentHistoryByDate = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { date } = useParams<ParamProps>();

  const [tournamentFullDate, setTournamentFullDate] = useState<Date | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  //
  // Если дата корректна, то сохраняем ее в стейт в формате Date
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
      setSelectedDate(null);
    }
  }, [tournamentFullDate]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const dateAsString: string = moment(date).format("DD-MM-YYYY");
      history.push(`/history/${dateAsString}`);
    }
  };

  return (
    <section className={classes.container}>
      <TournamentDatePicker
        date={tournamentFullDate}
        onChange={handleDateChange}
      />

      <TournamentTable date={selectedDate} />
    </section>
  );
};

export default TournamentHistoryByDate;

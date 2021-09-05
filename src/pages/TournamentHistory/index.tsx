import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import TournamentDatePicker from "components/TournamentDatePicker";
import { useHistory } from "react-router";

const TournamentHistory = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const [tournamentFullDate, setTournamentFullDate] = useState<Date | null>(
    null
  );

  useEffect(() => {
    if (tournamentFullDate) {
      const date: number = tournamentFullDate.getDate();
      const mounth: number = tournamentFullDate.getMonth() + 1;
      const year: number = tournamentFullDate.getFullYear();
      const pickedDate: string = `${date}-${mounth}-${year}`;

      history.push(`/history/${pickedDate}`);
    }
  }, [history, tournamentFullDate]);

  const handleDateChange = (date: Date | null) => {
    setTournamentFullDate(date);
  };

  return (
    <section className={classes.container}>
      <TournamentDatePicker
        date={tournamentFullDate}
        onChange={handleDateChange}
      />
    </section>
  );
};

export default TournamentHistory;

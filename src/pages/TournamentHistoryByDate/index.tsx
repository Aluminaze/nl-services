import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import TournamentDatePicker from "components/TournamentDatePicker";
import { useHistory, useParams } from "react-router";
import moment from "moment";
import TournamentTable from "components/TournamentTable";

interface ParamProps {
  date: string; // DD-MM-YYYY
}

const TournamentHistoryByDate = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const { date } = useParams<ParamProps>();

  const [dateAsDate, setDateAsDate] = useState<Date | null>(null);
  const [dateAsString, setDateAsString] = useState<string | null>(null);

  //
  // NOTE: Если дата корректна, то сохраняем ее в стейт в формате Date
  //
  useEffect(() => {
    const momentDate = moment(date, "DD-MM-YYYY");

    if (momentDate.isValid()) {
      setDateAsDate(momentDate.toDate());
    }
  }, [date]);

  useEffect(() => {
    if (dateAsDate) {
      const date: number = dateAsDate.getDate();
      const mounth: number = dateAsDate.getMonth() + 1;
      const year: number = dateAsDate.getFullYear();
      const pickedDate: string = `${date}/${mounth}/${year}`;

      setDateAsString(pickedDate);
    } else {
      setDateAsString(null);
    }
  }, [dateAsDate]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const dateAsString: string = moment(date).format("DD-MM-YYYY");
      history.push(`/history/${dateAsString}`);
    }
  };

  return (
    <section className={classes.container}>
      <TournamentDatePicker date={dateAsDate} onChange={handleDateChange} />

      <TournamentTable date={dateAsString} />
    </section>
  );
};

export default TournamentHistoryByDate;

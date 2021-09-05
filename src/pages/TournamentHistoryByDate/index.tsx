import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import TournamentDatePicker from "components/TournamentDatePicker";
import { useHistory, useParams } from "react-router";
import moment from "moment";
import TournamentTable from "components/TournamentTable";
import WarningIcon from "@material-ui/icons/Warning";

interface ParamProps {
  date: string; // DD-MM-YYYY
}

enum DateStatus {
  CHECKING = "CHECKING",
  CORRECT = "CORRECT",
  UNCORRECT = "UNCORRECT",
}

const TournamentHistoryByDate = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const { date } = useParams<ParamProps>();

  const [dateAsDate, setDateAsDate] = useState<Date | null>(null);
  const [dateAsString, setDateAsString] = useState<string | null>(null);
  const [dateStatus, setDateStatus] = useState<DateStatus>(DateStatus.CHECKING);

  //
  // NOTE: Если дата корректна, то сохраняем ее в стейт в формате Date
  //
  useEffect(() => {
    const momentDate = moment(date, "DD-MM-YYYY", true);

    if (momentDate.isValid()) {
      setDateAsDate(momentDate.toDate());
      setDateStatus(DateStatus.CORRECT);
    } else {
      setDateStatus(DateStatus.UNCORRECT);
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

      {dateStatus === DateStatus.CORRECT && (
        <TournamentTable date={dateAsString} />
      )}
      {dateStatus === DateStatus.UNCORRECT && (
        <div className={classes.info}>
          <div className={classes.infoHeader}>
            <WarningIcon fontSize="large" style={{ color: "#f44336" }} />
            <span className={classes.infoTitle}>Ошибка!</span>
          </div>
          <span className={classes.infoText}>Введенная дата некорректна!</span>
        </div>
      )}
    </section>
  );
};

export default TournamentHistoryByDate;

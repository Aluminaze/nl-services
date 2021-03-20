import React, { useContext, useEffect, useState } from "react";
import { Context } from "index";
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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const TournamentHistory = () => {
  const classes = useStyles();
  const { database } = useContext(Context);
  const [tournamentFullDate, setTournamentFullDate] = useState<Date | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string>("");

  // firebase refs
  const refTournaments = database.ref("tournaments");

  // firenase data
  const [tournamentsAtDay] = useList(
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
      <header className={classes.header}>
        <h1 className={classes.headerTitle}>
          Выберите дату проведения турнира
        </h1>
        <div className={classes.headerDatePicker}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              autoOk={true}
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker"
              label="дд/мм/гггг"
              value={tournamentFullDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </header>
      {selectedDate && (
        <div className={classes.table}>
          {tournamentsAtDay?.length ? (
            tournamentsAtDay.map((tournamentsData, index: number) => {
              const tournamentData: TournamentStruct = tournamentsData.val();

              return (
                <div className={classes.tableWrapper} key={index}>
                  <div className={classes.tableContainer}>
                    <h1>{tournamentData.id}</h1>

                    <TournamentAtTime
                      timeKey={TIME_KEY_11}
                      tournamentsData={tournamentsData}
                      participants={tournamentData.time11?.participants}
                    />
                    <TournamentAtTime
                      timeKey={TIME_KEY_15}
                      tournamentsData={tournamentsData}
                      participants={tournamentData.time15?.participants}
                    />
                    <TournamentAtTime
                      timeKey={TIME_KEY_19}
                      tournamentsData={tournamentsData}
                      participants={tournamentData.time19?.participants}
                    />
                    <TournamentAtTime
                      timeKey={TIME_KEY_23}
                      tournamentsData={tournamentsData}
                      participants={tournamentData.time23?.participants}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h1>Турнир по введенной дате не найден!</h1>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default TournamentHistory;

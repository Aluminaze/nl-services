import React, { useContext } from "react";
import { Button } from "@material-ui/core";
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
  WINNER_ID_DEF_VALUE,
} from "utils/constants";
import getCurrentDate from "utils/getCurrentDate";
import CircularProgress from "@material-ui/core/CircularProgress";

const Tournament = () => {
  const classes = useStyles();
  const { database } = useContext(Context);
  const currentDate: string = getCurrentDate(
    new Date().toLocaleDateString("en-US", {
      timeZone: "Europe/Minsk",
    })
  );

  // firebase refs
  const refTournaments = database.ref("tournaments");
  const refTorunamentPush = refTournaments.push();

  const [tournamentsAtDay, loadingTournamentsAtDay] = useList(
    refTournaments.orderByChild("id").equalTo(currentDate)
  );

  const addTournamentTable = (): void => {
    refTorunamentPush.set({
      id: currentDate,
      time11: { winner: WINNER_ID_DEF_VALUE, participants: {} },
      time15: { winner: WINNER_ID_DEF_VALUE, participants: {} },
      time19: { winner: WINNER_ID_DEF_VALUE, participants: {} },
      time23: { winner: WINNER_ID_DEF_VALUE, participants: {} },
    });
  };

  return (
    <section className={classes.container}>
      {loadingTournamentsAtDay ? (
        <CircularProgress color="primary" />
      ) : (
        <div className={classes.table}>
          {tournamentsAtDay?.length ? (
            tournamentsAtDay.map((tournamentsData, index: number) => {
              const tournamentData: TournamentStruct = tournamentsData.val();

              return (
                <div className={classes.tableWrapper} key={index}>
                  <div className={classes.tableContainer}>
                    <h1>Текущая дата турнира: {tournamentData.id}</h1>

                    <TournamentAtTime
                      tournamentDateId={getCurrentDate(currentDate)}
                      timeKey={TIME_KEY_11}
                      tournamentsData={tournamentsData}
                      participants={tournamentData.time11?.participants}
                    />
                    <TournamentAtTime
                      tournamentDateId={getCurrentDate(currentDate)}
                      timeKey={TIME_KEY_15}
                      tournamentsData={tournamentsData}
                      participants={tournamentData.time15?.participants}
                    />
                    <TournamentAtTime
                      tournamentDateId={getCurrentDate(currentDate)}
                      timeKey={TIME_KEY_19}
                      tournamentsData={tournamentsData}
                      participants={tournamentData.time19?.participants}
                    />
                    <TournamentAtTime
                      tournamentDateId={getCurrentDate(currentDate)}
                      timeKey={TIME_KEY_23}
                      tournamentsData={tournamentsData}
                      participants={tournamentData.time23?.participants}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className={classes.button}>
              <Button
                variant="contained"
                color="primary"
                onClick={addTournamentTable}
              >
                Создать турнирную таблицу на сегодняшний день
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Tournament;

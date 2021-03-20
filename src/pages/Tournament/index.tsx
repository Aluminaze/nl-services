import React, { useContext, useState } from "react";
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

const Tournament = () => {
  const classes = useStyles();
  const { database } = useContext(Context);
  const [currentDate] = useState<string>(
    new Date().toLocaleDateString("en-US", {
      timeZone: "Europe/Minsk",
    })
  );

  // firebase refs
  const refTournaments = database.ref("tournaments");
  const refTorunamentPush = refTournaments.push();

  const [tournamentsAtDay] = useList(
    refTournaments.orderByChild("id").equalTo(getCurrentDate(currentDate))
  );

  const addTournamentTable = (): void => {
    refTorunamentPush.set({
      id: getCurrentDate(currentDate),
      time11: { winner: WINNER_ID_DEF_VALUE, participants: {} },
      time15: { winner: WINNER_ID_DEF_VALUE, participants: {} },
      time19: { winner: WINNER_ID_DEF_VALUE, participants: {} },
      time23: { winner: WINNER_ID_DEF_VALUE, participants: {} },
    });
  };

  return (
    <section className={classes.container}>
      {/* {tournamentsAtDay?.length === 0 && (
        
      )} */}
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
          <div className={classes.button}>
            <Button variant="contained" onClick={addTournamentTable}>
              Создать турнирную таблицу
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tournament;

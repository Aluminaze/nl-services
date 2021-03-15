import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import { Context } from "index";
import { useList, useObjectVal } from "react-firebase-hooks/database";
import useStyles from "./styles";
import { TournamentStruct, UserStruct } from "interfaces";
import TournamentAtTime from "components/TournamentAtTime";

const Tournament = () => {
  const classes = useStyles();
  const { database } = useContext(Context);
  const [date, setDate] = useState<number>(1);

  // firebase refs
  const refTournaments = database.ref("tournaments");
  const refTorunamentPush = refTournaments.push();
  const refUsers = database.ref("users");

  // firebase data
  const [usersData] = useObjectVal<{ [key: string]: UserStruct }>(refUsers);
  const [tournamentsAtDay] = useList(
    refTournaments.orderByChild("id").equalTo("2/01/2020")
  );

  const userNames: string[] = usersData
    ? Object.values(usersData).map((user: UserStruct) => user.name)
    : [];
  const usersValData: UserStruct[] = usersData ? Object.values(usersData) : [];

  const addChild = (): void => {
    refTorunamentPush.set({
      id: `${date}/01/2020`,
      time11: { winner: "id", participants: {} },
      time15: { winner: "id", participants: {} },
      time19: { winner: "id", participants: {} },
      time23: { winner: "id", participants: {} },
    });
    setDate(date + 1);
  };

  return (
    <section className={classes.container}>
      <Button onClick={addChild}>Add child</Button>
      <div className={classes.table}>
        {tournamentsAtDay?.length
          ? tournamentsAtDay.map((tournamentsData, index: number) => {
              const tournamentData: TournamentStruct = tournamentsData.val();

              return (
                <div className={classes.tableContainer} key={index}>
                  <h1>{tournamentData.id}</h1>

                  <TournamentAtTime
                    timeKey={"time11"}
                    tournamentsData={tournamentsData}
                    usersValData={usersValData}
                    participants={tournamentData.time11?.participants}
                    userNames={userNames}
                    usersData={usersData}
                  />
                  <TournamentAtTime
                    timeKey={"time15"}
                    tournamentsData={tournamentsData}
                    usersValData={usersValData}
                    participants={tournamentData.time15?.participants}
                    userNames={userNames}
                    usersData={usersData}
                  />
                  <TournamentAtTime
                    timeKey={"time19"}
                    tournamentsData={tournamentsData}
                    usersValData={usersValData}
                    participants={tournamentData.time19?.participants}
                    userNames={userNames}
                    usersData={usersData}
                  />
                  <TournamentAtTime
                    timeKey={"time23"}
                    tournamentsData={tournamentsData}
                    usersValData={usersValData}
                    participants={tournamentData.time23?.participants}
                    userNames={userNames}
                    usersData={usersData}
                  />
                </div>
              );
            })
          : null}
      </div>
    </section>
  );
};

export default Tournament;

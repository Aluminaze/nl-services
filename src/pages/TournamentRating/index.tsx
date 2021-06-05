import React, { useContext } from "react";
import { Context } from "index";
import { UserStruct } from "interfacesAndTypes";
import { useObjectVal } from "react-firebase-hooks/database";
import useStyles from "./styles";
import clsx from "clsx";
import CircularLoader from "components/CircularLoader";

const TournamentRating = () => {
  const classes = useStyles();
  const { database } = useContext(Context);

  // firebase refs
  const refRatingUsers = database.ref("users");

  // firebase data
  const [usersValData, loading] =
    useObjectVal<{ [key: string]: UserStruct }>(refRatingUsers);
  const usersData: UserStruct[] = usersValData
    ? Object.values(usersValData)
    : [];

  return (
    <section
      className={clsx(classes.container, loading ? classes.alignCenter : null)}
    >
      {loading ? (
        <CircularLoader />
      ) : (
        <ul className={classes.tableContainer}>
          {usersData.length
            ? usersData.map((userData: UserStruct, index: number) => (
                <li
                  className={clsx(
                    classes.tableRow,
                    index % 2 === 0 ? classes.tableRowWithBackground : null
                  )}
                  key={index}
                >
                  <span className={classes.userName}>{userData.name}</span>
                  <span className={classes.userScore}>{userData.score}</span>
                </li>
              ))
            : null}
        </ul>
      )}
    </section>
  );
};

export default TournamentRating;

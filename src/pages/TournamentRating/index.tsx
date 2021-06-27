import React from "react";
import { UserStruct } from "interfacesAndTypes";
import { useListVals } from "react-firebase-hooks/database";
import useStyles from "./styles";
import clsx from "clsx";
import CircularLoader from "components/CircularLoader";
import firebase from "firebase";

const TournamentRating = () => {
  const classes = useStyles();
  const database = firebase.database();

  // firebase refs
  const refUsers = database.ref("users");

  // firebase data
  const [usersData, loadingUsersData] = useListVals<UserStruct>(refUsers);

  return (
    <section
      className={clsx(
        classes.container,
        loadingUsersData ? classes.alignCenter : null
      )}
    >
      {loadingUsersData ? (
        <CircularLoader />
      ) : (
        <ul className={classes.tableContainer}>
          {usersData?.length
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

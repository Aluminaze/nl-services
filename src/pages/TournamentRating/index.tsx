import React, { useEffect, useState } from "react";
import { UserStruct } from "interfacesAndTypes";
import { useListVals } from "react-firebase-hooks/database";
import useStyles from "./styles";
import clsx from "clsx";
import CircularLoader from "components/CircularLoader";
import firebase from "firebase";
import {
  Grid,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";
import {
  SortingState,
  IntegratedSorting,
  Sorting,
} from "@devexpress/dx-react-grid";
import useUser from "redux/hooks/useUser";

interface ITableColumn {
  name: string;
  title: string;
}

interface ITableRow {
  name: string;
  score: number;
}

interface ITableColumnExtensions {
  columnName: string;
  width: string;
}

const CustomTableRow = (props: Table.DataRowProps): JSX.Element => {
  const { row } = props;
  const userData = useUser();

  const classes = useStyles();
  return (
    <Table.Row
      {...props}
      className={clsx(
        classes.customTableRow,
        row.name === userData.name && classes.selectedRow
      )}
    />
  );
};

const TournamentRating = () => {
  const classes = useStyles();
  const database = firebase.database();

  // firebase refs
  const refUsers = database.ref("users");

  // firebase data
  const [usersData, loadingUsersData] = useListVals<UserStruct>(refUsers);
  const [tableRows, setTableRows] = useState<ITableRow[]>([]);
  const [tableColumns] = useState<ITableColumn[]>([
    { name: "name", title: "Пользователь" },
    { name: "score", title: "Очки" },
  ]);
  const [sorting, setSorting] = useState<Sorting[]>([
    { columnName: "name", direction: "asc" },
  ]);
  const [tableColumnExtensions] = useState<ITableColumnExtensions[]>([
    { columnName: "name", width: "auto" },
    { columnName: "score", width: "30%" },
  ]);

  useEffect(() => {
    if (usersData?.length) {
      const tempTableRows = usersData.map((userData: UserStruct) => ({
        name: userData.name,
        score: userData.score,
      }));
      setTableRows(tempTableRows);
    }
  }, [usersData]);

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
          <Grid rows={tableRows} columns={tableColumns}>
            <SortingState sorting={sorting} onSortingChange={setSorting} />
            <IntegratedSorting />
            <Table
              rowComponent={CustomTableRow}
              columnExtensions={tableColumnExtensions}
            />
            <TableHeaderRow showSortingControls />
          </Grid>
        </ul>
      )}
    </section>
  );
};

export default TournamentRating;

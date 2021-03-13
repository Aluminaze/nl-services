import React from "react";
import useStyles from "./styles";
import { Button } from "@material-ui/core";
import firebase from "firebase";

interface HeaderProps {
  user: firebase.User | null | undefined;
}

const Header = (props: HeaderProps): React.ReactElement => {
  const { user } = props;
  const classes = useStyles();

  const LogOut = () => {
    firebase.auth().signOut();
  };

  return (
    <header className={classes.header}>
      <h1 className={classes.headerLabel}>NLS</h1>

      {user && (
        <div className={classes.headerUserInfo}>
          <h2>{user.email}</h2>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={LogOut}
          >
            Выйти
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;

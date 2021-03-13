import React from "react";
import useStyles from "./styles";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import firebase from "firebase";

interface HeaderProps {
  isAuthorized: boolean;
}

const Header = (props: HeaderProps): React.ReactElement => {
  const { isAuthorized } = props;
  const classes = useStyles();
  const history = useHistory();

  const LogOut = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  return (
    <header className={classes.header}>
      <h1 className={classes.headerLabel}>NL services</h1>

      {isAuthorized && (
        <Button size="small" color="secondary" onClick={LogOut}>
          Выйти
        </Button>
      )}
    </header>
  );
};

export default Header;

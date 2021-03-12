import React from "react";
import useStyles from "./styles";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

interface HeaderProps {
  isAuthorized: boolean;
  setIsAuthorized: (status: boolean) => void;
}

const Header = (props: HeaderProps): React.ReactElement => {
  const { isAuthorized, setIsAuthorized } = props;
  const classes = useStyles();
  const history = useHistory();

  const LogOut = () => {
    setIsAuthorized(false);
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

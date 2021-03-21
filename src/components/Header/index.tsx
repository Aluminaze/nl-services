import React, { useState } from "react";
import useStyles from "./styles";
import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import AdminDialog from "components/Dialogs/AdminDialog";

interface HeaderProps {
  user: firebase.User | null | undefined;
}

const Header = (props: HeaderProps): React.ReactElement => {
  const { user } = props;
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const LogOut = () => {
    firebase.auth().signOut();
  };

  return (
    <header className={classes.header}>
      <h1 className={classes.headerLabel}>NLS</h1>

      {user && (
        <div className={classes.headerUserInfo}>
          {user.email === "aluminaze@gmail.com" ? (
            <h2 onClick={() => setIsDialogOpen(!isDialogOpen)}>{user.email}</h2>
          ) : (
            <h2>{user.email}</h2>
          )}
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

      <AdminDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </header>
  );
};

export default Header;

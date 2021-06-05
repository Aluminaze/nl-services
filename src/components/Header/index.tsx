import React, { useState } from "react";
import useStyles from "./styles";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/auth";
import AdminDialog from "components/Dialogs/AdminDialog";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import TournamentsNavigation from "components/TournamentsNavigation";
import Hidden from "@material-ui/core/Hidden";
import CloseIcon from "@material-ui/icons/Close";

interface HeaderProps {
  user: firebase.User | null | undefined;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const Header = (props: HeaderProps): React.ReactElement => {
  const { user } = props;
  const classes = useStyles();
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState<boolean>(false);

  const LogOut = () => {
    firebase.auth().signOut();
  };

  const [isNavDialogOpen, setIsNavDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsNavDialogOpen(!isNavDialogOpen);
  };

  const handleClose = () => {
    setIsNavDialogOpen(false);
  };

  return (
    <header className={classes.header}>
      {user ? (
        <>
          <Hidden mdUp>
            <IconButton
              aria-label="nav"
              color="secondary"
              onClick={handleClickOpen}
            >
              <MenuIcon color="secondary" />
            </IconButton>
          </Hidden>

          <Hidden smDown>
            <h1 className={classes.headerLabel}>NLS</h1>
          </Hidden>
        </>
      ) : (
        <h1 className={classes.headerLabel}>NLS</h1>
      )}

      {user && (
        <div className={classes.headerUserInfo}>
          {user.email === "aluminaze@gmail.com" ? (
            <h2 onClick={() => setIsAdminDialogOpen(!isAdminDialogOpen)}>
              {user.email}
            </h2>
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
        isDialogOpen={isAdminDialogOpen}
        setIsDialogOpen={setIsAdminDialogOpen}
      />

      <Dialog
        fullScreen
        open={isNavDialogOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className={classes.dialogBar}>
          <IconButton color="secondary" onClick={handleClose}>
            <CloseIcon color="secondary" />
          </IconButton>
        </div>
        <TournamentsNavigation handleDialogClose={handleClose} mobileVersion />
      </Dialog>
    </header>
  );
};

export default Header;

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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { resetUserActionCreator } from "redux/reducers/user/actions";

interface HeaderProps {}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const Header = (props: HeaderProps): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.userReducer);

  const LogOut = () => {
    firebase.auth().signOut();
    dispatch(resetUserActionCreator());
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
      {userData.isAuthorized ? (
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

      {userData.isAuthorized && (
        <div className={classes.headerUserInfo}>
          {userData.email === "aluminaze@gmail.com" ? (
            <h2 onClick={() => setIsAdminDialogOpen(!isAdminDialogOpen)}>
              {userData.email}
            </h2>
          ) : (
            <h2>{userData.email}</h2>
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

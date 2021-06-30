import React, { useCallback, useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import AdminDialog from "components/Dialogs/AdminDialog";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import Hidden from "@material-ui/core/Hidden";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { resetUserActionCreator } from "redux/reducers/user/actions";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PersonIcon from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import TournamentsNavigation from "components/TournamentsNavigation";
import useStyles from "./styles";

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
  const userData = useSelector((state: RootState) => state.userReducer);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState<boolean>(false);
  const [isNavDialogOpen, setIsNavDialogOpen] = useState<boolean>(false);
  const [isPopperOpen, setIsPopperOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const [showUserRating, setShowUserRating] = useState<boolean>(false);

  const checkLocation = useCallback(() => {
    return location.pathname !== "/rating";
  }, [location.pathname]);

  useEffect(() => {
    if (userData.name.length && userData.score !== null && checkLocation()) {
      setShowUserRating(true);
    } else {
      setShowUserRating(false);
    }
  }, [checkLocation, location.pathname, userData.name, userData.score]);

  const handleTogglePopper = () => {
    setIsPopperOpen((prevOpen) => !prevOpen);
  };

  const handleClosePopper = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setIsPopperOpen(false);
  };

  const LogOut = (): void => {
    setIsPopperOpen(false);
    firebase.auth().signOut();
    dispatch(resetUserActionCreator());
  };

  const handleClickOpen = (): void => {
    setIsNavDialogOpen(!isNavDialogOpen);
  };

  const handleClose = (): void => {
    setIsNavDialogOpen(false);
  };

  const handleOpenAdminDialog = (): void => {
    if (userData.email === "aluminaze@gmail.com") {
      setIsAdminDialogOpen(!isAdminDialogOpen);
    }
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
        <div className={classes.headerInfo}>
          <CSSTransition
            in={showUserRating}
            timeout={300}
            unmountOnExit
            classNames={{
              enter: classes.userRatingEnter,
              enterActive: classes.userRatingEnterActive,
              exit: classes.userRatingExit,
              exitActive: classes.userRatingExitActive,
            }}
            onExit={() => console.log("exit")}
          >
            <div
              className={classes.headerInfoUser}
              onClick={handleOpenAdminDialog}
            >
              <div className={classes.headerInfoUserRating}>
                <span className={classes.headerInfoUserName}>
                  {userData.name}
                </span>
                <span className={classes.headerInfoUserScore}>
                  {userData.score}
                </span>
              </div>
            </div>
          </CSSTransition>
          <IconButton ref={anchorRef} onClick={handleTogglePopper}>
            <PersonIcon color="secondary" />
          </IconButton>
          <Popper
            open={isPopperOpen}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClosePopper}>
                    <MenuList autoFocusItem={isPopperOpen} id="menu-list-grow">
                      <MenuItem>
                        <div className={classes.menuItemIcon}>
                          <AssignmentIndIcon fontSize="large" />
                        </div>
                        <div className={classes.menuItemUser}>
                          <h1>{userData.fullName}</h1>
                          <h2>{userData.email}</h2>
                        </div>
                      </MenuItem>
                      <Divider className={classes.divider} />
                      <MenuItem onClick={LogOut}>
                        <span>Выйти</span>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
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

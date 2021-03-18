import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import WarningIcon from "@material-ui/icons/Warning";
import useStyles from "./styles";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogProps {
  title: string;
  message: string;
  buttonLabel: string;
  open: boolean;
  setOpen: (status: boolean) => void;
}

const AlertDialog = (props: AlertDialogProps) => {
  const { title, message, buttonLabel, open, setOpen } = props;
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <div className={classes.title}>
          <WarningIcon color="error" />
          <span className={classes.titleText}>{title}</span>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <span className={classes.messageText}>{message}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={handleClose}
          color="primary"
        >
          {buttonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;

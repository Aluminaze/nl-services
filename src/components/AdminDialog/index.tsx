import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "80vw",
    height: "80vh",
  },
}));

interface AdminDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (status: boolean) => void;
}

const AdminDialog = (props: AdminDialogProps) => {
  const { isDialogOpen, setIsDialogOpen } = props;
  const classes = useStyles();

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog
      maxWidth={false}
      open={isDialogOpen}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          CLOSE
        </Button>
      </DialogActions>
      <DialogContent className={classes.dialog}>ADMIN DIALOG</DialogContent>
    </Dialog>
  );
};

export default AdminDialog;

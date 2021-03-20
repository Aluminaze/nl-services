import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useStyles from "./styles";
import getTimeByTimeKey from "utils/getTimeByTimeKey";

interface ActionLogsDialogProps {
  isDialogOpen: boolean;
  actionLogsData: string[];
  setIsDialogOpen: (status: boolean) => void;
  date: string;
  timeKey: string;
}

const ActionLogsDialog = (props: ActionLogsDialogProps) => {
  const {
    isDialogOpen,
    actionLogsData,
    setIsDialogOpen,
    date,
    timeKey,
  } = props;
  const classes = useStyles();

  const handleClose = (): void => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog
      maxWidth={false}
      open={isDialogOpen}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <div className={classes.title}>
          <span className={classes.titleText}>Журнал турнира</span>
          <span className={classes.titleText}>Дата: {date}</span>
          <span className={classes.titleText}>
            Время проведения турнира: {getTimeByTimeKey(timeKey)}
          </span>
        </div>
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        {actionLogsData.length ? (
          <ul className={classes.dialogList}>
            {actionLogsData.map((actionLog: string) => (
              <li>{actionLog}</li>
            ))}
          </ul>
        ) : (
          <ul className={classes.dialogList}>
            <li>Записей нету</li>
          </ul>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionLogsDialog;

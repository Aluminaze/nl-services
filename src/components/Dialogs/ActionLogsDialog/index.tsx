import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useStyles from "./styles";
import getTimeByTimeKey from "utils/getTimeByTimeKey";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

interface ActionLogsDialogProps {
  isDialogOpen: boolean;
  actionLogsData: string[];
  setIsDialogOpen: (status: boolean) => void;
  date: string;
  timeKey: string;
}

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <div className={classes.title}>
          <span className={classes.titleText}>Журнал турнира</span>
          <span className={classes.titleText}>Дата: {date}</span>
          <span className={classes.titleText}>
            Время проведения турнира: {getTimeByTimeKey(timeKey)}
          </span>
        </div>
      </DialogTitle>
      <DialogContent className={classes.dialog} dividers>
        {actionLogsData.length ? (
          <ul className={classes.dialogList}>
            {actionLogsData.map((actionLog: string, index: number) => (
              <li key={index}>{actionLog}</li>
            ))}
          </ul>
        ) : (
          <ul className={classes.dialogList}>
            <li>Записей нету</li>
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ActionLogsDialog;

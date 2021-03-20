import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Context } from "index";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "80vw",
    height: "80vh",
  },
  dialogInputBlock: {
    "& input": {
      border: "1px solid black",
      fontSize: 14,
      margin: "15px 0",
    },
  },
}));

interface AdminDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (status: boolean) => void;
}

const AdminDialog = (props: AdminDialogProps) => {
  const { isDialogOpen, setIsDialogOpen } = props;
  const classes = useStyles();
  const { database } = useContext(Context);
  const refUsers = database.ref("users");
  const refUsersPush = refUsers.push();

  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userScore, setUserScore] = useState<number>(0);
  const [usersInJSON, setUsersInJSON] = useState<string>("");

  const resetStates = (): void => {
    setUserId("");
    setUserName("");
    setUserScore(0);
    setUsersInJSON("");
  };

  const addNewUser = (): void => {
    refUsersPush.set(
      {
        id: userId,
        name: userName,
        score: userScore,
      },
      (error) => {
        if (error) {
          console.error(
            `The write failed!   UserId: ${userId} | UserName: ${userName}`
          );
        } else {
          console.log(`User ${userName} added successfully!`);
        }
      }
    );

    resetStates();
  };

  const storeNewUsers = (): void => {
    const usersData: Array<any> = JSON.parse(usersInJSON);

    refUsers.set({ ...usersData }, (error) => {
      if (error) {
        console.error(`The write failed! Users not added!`);
      } else {
        console.log(`Users added successfully!`);
      }
    });

    resetStates();
  };

  const handleClose = (): void => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    resetStates();
  }, []);

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
      <DialogContent className={classes.dialog}>
        ADMIN DIALOG
        <div className={classes.dialogInputBlock}>
          <label>ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className={classes.dialogInputBlock}>
          <label>NAME:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={classes.dialogInputBlock}>
          <label>SCORE:</label>
          <input
            type="text"
            value={userScore}
            onChange={(e) => setUserScore(Number(e.target.value))}
          />
        </div>
        <Button variant="contained" color="primary" onClick={addNewUser}>
          ADD NEW USER
        </Button>
        <div className={classes.dialogInputBlock}>
          <label>USERS (JSON):</label>
          <input
            type="text"
            value={usersInJSON}
            onChange={(e) => setUsersInJSON(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" onClick={storeNewUsers}>
          ADD NEW USERS
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDialog;

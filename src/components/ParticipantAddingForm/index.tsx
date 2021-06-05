import React, { useState } from "react";
import useStyles from "./styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button } from "@material-ui/core";
import _ from "lodash";
import { TimeKeyStruct } from "interfacesAndTypes";
import AlertDialog from "components/Dialogs/AlertDialog";
import { MAX_SUM_OF_COUNTS } from "utils/constants";

interface ParticipantAddingFormProps {
  timeKey: TimeKeyStruct;
  allUserNames: string[];
  selectedParticipantNames: string[];
  sumOfCounts: number;
  setIsAdding: (status: boolean) => void;
  addNewParticipant: (userName: string, count: number) => void;
}
const amount: string[] = _.range(0, 17).map((num) => String(num));

const ParticipantAddingForm = (props: ParticipantAddingFormProps) => {
  const {
    timeKey,
    allUserNames,
    selectedParticipantNames,
    sumOfCounts,
    setIsAdding,
    addNewParticipant,
  } = props;
  const classes = useStyles();
  const [selectedParticipantName, setSelectedParticipantName] =
    useState<string | null>(null);
  const [inputParticipantName, setInputParticipantName] = useState<string>("");
  const [inputAmountOfMeat, setInputAmountOfMeat] =
    useState<string | null>(null);
  const [inputAmount, setInputAmount] = useState<string>("");
  const [isOpenAddedDialog, setIsOpenAddedDialog] = useState<boolean>(false);
  const [isOpenСountDialog, setIsOpenCountDialog] = useState<boolean>(false);

  const storeNewParticipant = (): void => {
    if (selectedParticipantName && inputAmountOfMeat) {
      if (selectedParticipantNames.includes(selectedParticipantName)) {
        setIsOpenAddedDialog(true);
      } else {
        let count: number = Number(inputAmountOfMeat);

        if (sumOfCounts + count <= MAX_SUM_OF_COUNTS) {
          addNewParticipant(selectedParticipantName, count);
          setIsAdding(false);
        } else {
          setIsOpenCountDialog(true);
        }
      }
    }
  };

  return (
    <>
      <h2 className={classes.title}>Заполните поля</h2>

      <div className={classes.inputWrapper}>
        <Autocomplete
          value={selectedParticipantName}
          size="small"
          onChange={(event: any, newValue: string | null) => {
            setSelectedParticipantName(newValue);
          }}
          inputValue={inputParticipantName}
          onInputChange={(event, newInputValue) => {
            setInputParticipantName(newInputValue);
          }}
          id={`participant-autocomplete-${timeKey}`}
          options={allUserNames}
          style={{ minWidth: 215 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Выберите персонажа"
              variant="outlined"
            />
          )}
        />
      </div>

      <div className={classes.inputWrapper}>
        <Autocomplete
          value={inputAmountOfMeat}
          size="small"
          onChange={(event: any, newValue: string | null) => {
            setInputAmountOfMeat(newValue);
          }}
          inputValue={inputAmount}
          onInputChange={(event, newInputValue) => {
            setInputAmount(newInputValue);
          }}
          id={`amount-of-meat-autocomplete-${timeKey}`}
          options={amount}
          style={{ width: 170 }}
          renderInput={(params) => (
            <TextField {...params} label="Привел мяска" variant="outlined" />
          )}
        />
      </div>

      <div className={classes.buttonsWrapper}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={storeNewParticipant}
          disabled={inputParticipantName && inputAmountOfMeat ? false : true}
        >
          <span className={classes.btnLabel}>Сохранить</span>
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => setIsAdding(false)}
        >
          <span className={classes.btnLabel}>Отмена</span>
        </Button>
      </div>

      <AlertDialog
        title={"Внимание!"}
        message={`${selectedParticipantName} уже добавлен в список участников текущего турнира. Повторное добавление невозможно!`}
        buttonLabel={"Закрыть"}
        open={isOpenAddedDialog}
        setOpen={setIsOpenAddedDialog}
      />
      <AlertDialog
        title={"Внимание!"}
        message={`Превышено максимальное количество участников! Еще можно добавить мясца в количестве: ${
          MAX_SUM_OF_COUNTS - sumOfCounts
        }`}
        buttonLabel={"Закрыть"}
        open={isOpenСountDialog}
        setOpen={setIsOpenCountDialog}
      />
    </>
  );
};

export default ParticipantAddingForm;

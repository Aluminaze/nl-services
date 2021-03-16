import React, { useState } from "react";
import useStyles from "./styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button } from "@material-ui/core";
import _ from "lodash";
import { TimeKeyStruct } from "interfacesAndTypes";

interface ParticipantAddingFormProps {
  timeKey: TimeKeyStruct;
  allUserNames: string[];
  setIsAdding: (status: boolean) => void;
  addNewParticipant: (userName: string, count: number) => void;
}
const amount: string[] = _.range(0, 17).map((num) => String(num));

const ParticipantAddingForm = (props: ParticipantAddingFormProps) => {
  const { timeKey, allUserNames, setIsAdding, addNewParticipant } = props;
  const classes = useStyles();
  const [selectedParticipantName, setSelectedParticipantName] = useState<
    string | null
  >(null);
  const [inputParticipantName, setInputParticipantName] = useState<string>("");
  const [inputAmountOfMeat, setInputAmountOfMeat] = useState<string | null>(
    null
  );
  const [inputAmount, setInputAmount] = useState<string>("");

  const storeNewParticipant = (): void => {
    if (selectedParticipantName && inputAmountOfMeat) {
      addNewParticipant(selectedParticipantName, Number(inputAmountOfMeat));

      setIsAdding(false);
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
          style={{ width: 300 }}
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
          Сохранить
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => setIsAdding(false)}
        >
          Отмена
        </Button>
      </div>
    </>
  );
};

export default ParticipantAddingForm;

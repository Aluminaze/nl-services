import React, { useState } from "react";
import useStyles from "./styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button } from "@material-ui/core";
import _ from "lodash";

interface ParticipantAddingFormProps {
  setIsAdding: (status: boolean) => void;
}
const participants: string[] = ["*Ricardo*", "Muhamed_mc", "ПРОВАР", "~A~I~D~"];
const amount: string[] = _.range(1, 17).map((num) => String(num));

const ParticipantAddingForm = (props: ParticipantAddingFormProps) => {
  const { setIsAdding } = props;
  const classes = useStyles();
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(
    null
  );
  const [inputParcipName, setInputParcipName] = useState<string>("");
  const [inputAmountOfMeat, setInputAmountOfMeat] = useState<string | null>(
    null
  );
  const [inputAmount, setInputAmount] = useState<string>("");

  return (
    <>
      <h2 className={classes.title}>Заполните поля</h2>

      <div className={classes.inputWrapper}>
        <Autocomplete
          value={selectedParticipant}
          size="small"
          onChange={(event: any, newValue: string | null) => {
            setSelectedParticipant(newValue);
          }}
          inputValue={inputParcipName}
          onInputChange={(event, newInputValue) => {
            setInputParcipName(newInputValue);
          }}
          id="participant-autocomplete"
          options={participants}
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
          id="amount-of-meat-autocomplete"
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
          onClick={() => setIsAdding(false)}
          disabled={inputParcipName && inputAmountOfMeat ? false : true}
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

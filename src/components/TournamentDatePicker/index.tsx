import React from "react";
import useStyles from "./styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

interface TournamentDatePickerProps {
  date: Date | null;
  onChange: (date: Date | null) => void;
}

const TournamentDatePicker = (
  props: TournamentDatePickerProps
): JSX.Element => {
  const { date, onChange } = props;
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <h1 className={classes.headerTitle}>Выберите дату проведения турнира</h1>
      <div className={classes.headerDatePicker}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            autoOk={true}
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker"
            label="дд/мм/гггг"
            value={date}
            onChange={onChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            invalidDateMessage={"Неккоректная дата"}
          />
        </MuiPickersUtilsProvider>
      </div>
    </header>
  );
};

export default TournamentDatePicker;

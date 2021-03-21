import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import firebaseConfig from "firebaseConfig";
import { ContextProps } from "interfacesAndTypes";
import { ConfirmProvider } from "material-ui-confirm";
import * as schedule from "node-schedule";
import getCurrentDate from "utils/getCurrentDate";
import { WINNER_ID_DEF_VALUE } from "utils/constants";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#35393e",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

firebase.initializeApp(firebaseConfig);

//
// SCHEDULES
//
const ruleTournament = new schedule.RecurrenceRule();
ruleTournament.hour = 0;
ruleTournament.second = 20;
ruleTournament.tz = "Europe/Minsk";

schedule.scheduleJob(ruleTournament, function () {
  const currentDate: string = getCurrentDate();
  const refTournaments = firebase.database().ref("tournaments");
  const refTournamentsPush = refTournaments.push();

  refTournaments
    .orderByChild("id")
    .equalTo(currentDate)
    .get()
    .then(function (snapshot) {
      if (!snapshot.exists()) {
        refTournamentsPush.set({
          id: currentDate,
          time11: { winner: WINNER_ID_DEF_VALUE, participants: {} },
          time15: { winner: WINNER_ID_DEF_VALUE, participants: {} },
          time19: { winner: WINNER_ID_DEF_VALUE, participants: {} },
          time23: { winner: WINNER_ID_DEF_VALUE, participants: {} },
        });
      }
    });
});

const ruleCurrentDate = new schedule.RecurrenceRule();
ruleCurrentDate.hour = 0;
ruleCurrentDate.second = 30;
ruleCurrentDate.tz = "Europe/Minsk";

schedule.scheduleJob(ruleCurrentDate, function () {
  const currentDate: string = getCurrentDate();

  const refCurrentTime = firebase.database().ref("currentDate");
  refCurrentTime.set(currentDate);
});

//
// CONTEXT
//
const initContextState: ContextProps = {
  auth: firebase.auth(),
  database: firebase.database(),
};

export const Context = React.createContext<ContextProps>(initContextState);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MuiThemeProvider theme={theme}>
        <ConfirmProvider>
          <Context.Provider
            value={{ auth: firebase.auth(), database: firebase.database() }}
          >
            <App />
          </Context.Provider>
        </ConfirmProvider>
      </MuiThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

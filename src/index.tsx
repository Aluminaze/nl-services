import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";
import firebaseConfig from "firebaseConfig";
import { ContextProps } from "interfaces";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0071e3",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

firebase.initializeApp(firebaseConfig);

const initContextState: ContextProps = {
  auth: firebase.auth(),
  firestore: firebase.firestore(),
};

export const Context = React.createContext<ContextProps>(initContextState);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MuiThemeProvider theme={theme}>
        <Context.Provider
          value={{ auth: firebase.auth(), firestore: firebase.firestore() }}
        >
          <App />
        </Context.Provider>
      </MuiThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

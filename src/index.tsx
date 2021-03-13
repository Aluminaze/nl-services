import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";

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

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

interface ContextProps {
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
}

const initContextState: ContextProps = {
  auth: firebase.auth(),
  firestore: firebase.firestore(),
};

export const Context = React.createContext<ContextProps>(initContextState);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MuiThemeProvider theme={theme}>
        <Context.Provider value={initContextState}>
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

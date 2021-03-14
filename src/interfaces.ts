import firebase from "firebase";

export interface ContextProps {
  auth: firebase.auth.Auth;
  database: firebase.database.Database;
}

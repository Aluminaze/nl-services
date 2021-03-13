import firebase from "firebase";

export interface ContextProps {
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
}

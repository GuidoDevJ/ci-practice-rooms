import * as admin from "firebase-admin";
import firebase from 'firebase/compat/app'
import * as services from "./firebase.json"
import 'firebase/compat/database'
import 'firebase/compat/firestore'



admin.initializeApp({
  credential: admin.credential.cert(services as any),
  databaseURL: "https://desafio-3-md6-default-rtdb.firebaseio.com"
});

const app = firebase.initializeApp({
  apiKey: "h8XYAY8RN7ALuqKsqnlneYmczGHlLv0PoJVx7J4u",
  authDomain: "desafio-3-md6.firebaseapp.com",
  databaseURL: "https://desafio-3-md6-default-rtdb.firebaseio.com",
  projectId: "desafio-3-md6",
})

const fireStore = admin.firestore()
const bdrt = firebase.database()

export{
  fireStore,
  bdrt
}



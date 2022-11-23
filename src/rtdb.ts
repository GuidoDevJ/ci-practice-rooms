import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
const app = firebase.initializeApp({
    apiKey: "h8XYAY8RN7ALuqKsqnlneYmczGHlLv0PoJVx7J4u",
    authDomain: "desafio-3-md6.firebaseapp.com",
    databaseURL: "https://desafio-3-md6-default-rtdb.firebaseio.com",
    projectId: "desafio-3-md6",
})
const rtdb = firebase.database()

export {
    rtdb
}
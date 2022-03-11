import firebase from 'firebase/app';
import "firebase/database";

const config = {

        apiKey: "AIzaSyB1wMgeeyR0LflYa5xfGNomBnpQrRLSrXw",

        authDomain: "fire-talk-85e30.firebaseapp.com",

        databaseURL: "https://fire-talk-85e30-default-rtdb.firebaseio.com",

        projectId: "fire-talk-85e30",

        storageBucket: "fire-talk-85e30.appspot.com",

        messagingSenderId: "1023958757519",

        appId: "1:1023958757519:web:c9d2cab64854123c8d40fa"

};
const db = firebase.initializeApp(config);
export default db;
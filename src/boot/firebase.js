import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import * as firebase from "./firebase";
// import { getToken } from "firebase/messaging";
// import { getMessaging } from "firebase/messaging/sw";
// import { onMessage } from "firebase/messaging";
// import { snapshot } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyD2X2lpPHA0GtJzmn14L40Chp5NIfvNxZ8",

  authDomain: "tf-traning.firebaseapp.com",

  databaseURL:
    "https://tf-traning-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "tf-traning",

  storageBucket: "tf-traning.appspot.com",

  messagingSenderId: "778623128896",

  appId: "1:778623128896:web:8027265a26b77b42fc56a5",

  measurementId: "G-059YBZNE22",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const colRef = collection(db, "food");

const trening = collection(db, "workouts");

getDocs(colRef).then((snapshot) => {
  let food = [];
  snapshot.docs.forEach((doc) => {
    food.push({ ...doc.data(), id: doc.id });
  });
  console.log(food);
});

export default db;

// const messaging = getMessaging(app);

// getToken(messaging, {
//   vapidKey:
//     "BAl7RyuIaWI5gdg_kD0bM7ceyzzWIlt65JWYOOgsSyH-UBwQuHY3XPINPXVVJ9UT-UGNhfWSuA7yorXv2XDhAjU",
// });

// function requestPermission() {
//   console.log("Requesting permission...");
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Notification permission granted.");
//     }
//   });
// }

// onMessage(messaging, (payload) => {
//   console.log("Message received. ", payload);
// });

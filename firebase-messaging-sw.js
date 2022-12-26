import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { getToken } from "firebase/messaging";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyD2X2lpPHA0GtJzmn14L40Chp5NIfvNxZ8",

  authDomain: "tf-traning.firebaseapp.com",

  databaseURL:
    "https://tf-traning-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "tf-traning",

  storageBucket: "tf-traning.appspot.com",

  messagingSenderId: "778623128896",

  appId: "1:778623128896:web:8027265a26b77b42fc56a5",

  measurementId: "G-059YBZNE22",
});

const messaging = getMessaging(firebaseApp);

getToken(messaging, {
  vapidKey:
    "BAl7RyuIaWI5gdg_kD0bM7ceyzzWIlt65JWYOOgsSyH-UBwQuHY3XPINPXVVJ9UT-UGNhfWSuA7yorXv2XDhAjU",
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

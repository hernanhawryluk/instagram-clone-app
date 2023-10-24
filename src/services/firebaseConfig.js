import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// 1) Rename this file to "firebase.js".

// 2) Fill firebaseConfig with the settings of your Firebase project.

const firebaseConfig = {
  apiKey: "yourApiKey",
  authDomain: "yourAuthDomain",
  projectId: "yourProjectId",
  storageBucket: "yourStorageBucket",
  messagingSenderId: "yourMessagingSenderId",
  appId: "yourAppId",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase;

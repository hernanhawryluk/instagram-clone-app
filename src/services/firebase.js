import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC61M-mcCdlkudNOvqtpMNO6XU28Ds3Tng",
  authDomain: "instagram-clone-app-3f538.firebaseapp.com",
  projectId: "instagram-clone-app-3f538",
  storageBucket: "instagram-clone-app-3f538.appspot.com",
  messagingSenderId: "923663435657",
  appId: "1:923663435657:web:55648541fad8fbcfd30358"
};

// !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
firebase.initializeApp(firebaseConfig);



export default firebase;

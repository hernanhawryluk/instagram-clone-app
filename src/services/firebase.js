import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC61M-mcCdlkudNOvqtpMNO6XU28Ds3Tng",
  authDomain: "instagram-clone-app-3f538.firebaseapp.com",
  projectId: "instagram-clone-app-3f538",
  storageBucket: "instagram-clone-app-3f538.appspot.com",
  messagingSenderId: "923663435657",
  appId: "1:923663435657:web:55648541fad8fbcfd30358",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

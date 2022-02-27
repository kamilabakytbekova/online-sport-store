import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsYYM5T8X_pjdoSF7DY_MMLTsY5ifLaH4",
  authDomain: "online-sport-store.firebaseapp.com",
  projectId: "online-sport-store",
  storageBucket: "online-sport-store.appspot.com",
  messagingSenderId: "657347862657",
  appId: "1:657347862657:web:935e0d769390c58e11ad80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

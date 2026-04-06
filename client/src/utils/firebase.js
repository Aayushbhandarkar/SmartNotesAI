
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "auth-exam-notes-c7b61.firebaseapp.com",
  projectId: "auth-exam-notes-c7b61",
  storageBucket: "auth-exam-notes-c7b61.firebasestorage.app",
  messagingSenderId: "960346981748",
  appId: "1:960346981748:web:9d62ce5ac0e27f2cae9821"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}



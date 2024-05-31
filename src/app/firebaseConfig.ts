import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbn6gFwEgUXvVL6Ra3xGyQVSLNqt-eOeo",
  authDomain: "backup-db-b6212.firebaseapp.com",
  projectId: "backup-db-b6212",
  storageBucket: "backup-db-b6212.appspot.com",
  messagingSenderId: "673171098513",
  appId: "1:673171098513:web:defe27527db3bc97e56830",
  measurementId: "G-SSDYHPRPJ1"
};

const app = initializeApp(firebaseConfig);

export const firebaseDB = getFirestore(app)
export const auth = getAuth(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDekYi7P-OrMK5JEM05JG bMyNT-fbuHUuA",
  authDomain: "bikerapp-d6802.firebaseapp.com",
  projectId: "bikerapp-d6802",
  storageBucket: "bikerapp-d6802.appspot.com",
  messagingSenderId: "694862036731",
  appId: "1:694862036731:web:6237788c0ef54ba40eba5e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

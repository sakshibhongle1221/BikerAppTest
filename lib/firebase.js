import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeKYi7P-OrMK5JEM05JGbMyNT-fbuHUuA",
  authDomain: "bikerapp-d6802.firebaseapp.com",
  projectId: "bikerapp-d6802",
  storageBucket: "bikerapp-d6802.firebasestorage.app",
  messagingSenderId: "694862036731",
  appId: "1:694862036731:web:0768f56f068f7d040eba5e",
  measurementId: "G-QVEWB3LB3L"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
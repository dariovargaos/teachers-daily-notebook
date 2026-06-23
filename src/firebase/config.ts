import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLFG7yBNqfpqNgMH3VNbZPFGkt_yNE_v4",
  authDomain: "skolski-rokovnik.firebaseapp.com",
  projectId: "skolski-rokovnik",
  storageBucket: "skolski-rokovnik.firebasestorage.app",
  messagingSenderId: "766030902145",
  appId: "1:766030902145:web:eabf3a3c9e5cdbe5572e80",
};

//init firebase
const app = initializeApp(firebaseConfig);

//init firestore db
const db = getFirestore(app);

//init auth
const auth = getAuth(app);

export { db, auth, Timestamp };

import { getFirestore as getClientFirestore} from "firebase/firestore";
import { collection, addDoc, setDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { Users } from "./constants";
import type { User } from "./constants";
import { initializeApp } from "firebase/app";

// #TODO: Replace with environment variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: "sbfr-47acd.firebaseapp.com",
  projectId: "sbfr-47acd",
  storageBucket: "sbfr-47acd.firebasestorage.app",
  messagingSenderId: "517772983155",
  appId: "1:517772983155:web:d78576ef118d9901f72306",
  measurementId: "G-Z51RDBF33C"
};

export const clientApp = initializeApp(firebaseConfig);
export const db = getClientFirestore(clientApp);

export const readUser = async (user: string) => {
  const snapshot = await getDoc(doc(db, Users.COLLECTION, user));
  return snapshot.data();
}

export const addUser = async (user: User) => {
    await addDoc(collection(db, Users.COLLECTION), {
        name: user.name,
        points: user.points,
        wagers: user.wagers,
        wins: user.wins,
    });
};

export const setUser = async (user: User) => {
    await setDoc(doc(db, Users.COLLECTION, user.name), {
        name: user.name,
        points: user.points,
        wagers: user.wagers,
        wins: user.wins,
    });
};

export const updateField = async (user: User, field: string, value: number) => {
    await updateDoc(doc(db, Users.COLLECTION, user.name), {
        [field]: value,
    });
};



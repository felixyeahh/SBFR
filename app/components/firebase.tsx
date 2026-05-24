import { getFirestore as getClientFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc, updateDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { Wagers } from "./constants";
import type { Wager } from "./constants";
import { initializeApp } from "firebase/app";
import { Users, type User } from "./userContext";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const clientApp = initializeApp(firebaseConfig);
export const db = getClientFirestore(clientApp);

export const getAllUsers = async () => {
  const snapshot = await getDocs(collection(db, Users.COLLECTION));
  const users: User[] = [];
  snapshot.forEach((firestoreDoc) => {
    const data: User = firestoreDoc.data() as User;
    data.name = firestoreDoc.id;
    users.push(data);
  });
  return users;
}

export const readUser = async (user: string) => {
  const snapshot = await getDoc(doc(db, Users.COLLECTION, user));
  const data = snapshot.data();


  return snapshot.data() as User;
}

export const addUser = async (user: User) => {
    const _user: User = {name: user.name, points: user.points, wagers: user.wagers, wins: user.wins, password: user.password, isAdmin: user.isAdmin};
    await addDoc(collection(db, Users.COLLECTION), _user);

    return _user;
}

export const setUser = async (user: User) => {
    const _user: User = {name: user.name, points: user.points, wagers: user.wagers, wins: user.wins, password: user.password, isAdmin: user.isAdmin};
    await setDoc(doc(db, Users.COLLECTION, user.name), _user);

    return _user;
};

export const updateField = async (user: string, field: string, value: number) => {
    await updateDoc(doc(db, Users.COLLECTION, user), {
        [field]: value,
    });
};

export const addWager = async (users: string[], bet: number, betName: string) => {
    const _id = String(globalThis.crypto.randomUUID());

    if (users.length === 0) { throw new Error("No users selected"); }

    const _wager: Wager = {
        id: _id,
        bet: bet,
        betName: betName,
        players: users, 
        date_created: new Date(), 
        finished: false
    }

    try {
        await setDoc(doc(db, Wagers.COLLECTION, _id), _wager);
    } catch (error) {
        throw new Error("Failed to add wager: " + error);
    }

    return _wager;
}

export const updateWager = async (wager_id: string, field: string, value: any) => {
    await updateDoc(doc(db, Wagers.COLLECTION, wager_id), {
        [field]: value,
    });
}

export const getAllWagers = async () => {
    const snapshot = await getDocs(collection(db, Wagers.COLLECTION));
    const wagers: Wager[] = [];
    snapshot.forEach((firestoreDoc) => {
        const data = firestoreDoc.data() as Wager;
        data.id = firestoreDoc.id;
        wagers.push(data);
    });
    return wagers;
}


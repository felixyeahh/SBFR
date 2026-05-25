import { getFirestore as getClientFirestore, type Firestore } from "firebase/firestore";
import { collection, addDoc, setDoc, updateDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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

export interface DatabaseEntry {
    id: string | null;
}

export class Database <T extends DatabaseEntry>{
    protected db: Firestore;
    protected collection: string;

    constructor (db: Firestore, collection: string) {
        this.db = db;
        this.collection = collection;
    }

    public async getAll () {
        const snapshot = await getDocs(collection(this.db, this.collection));
        const entries: T[] = [];
        snapshot.forEach((firestoreDoc) => {    
            const data: T = firestoreDoc.data() as T;
            data.id = firestoreDoc.id;
            entries.push(data);
        });
        return entries;
    }

    public async read (id: string) {
      const snapshot = await getDoc(doc(this.db, this.collection, id));
      return snapshot.data() as T;
    }

    public async add (item: T) {
        await addDoc(collection(this.db, this.collection), item);
        return item;
    }
    
    public async set (item: T) {
        if (item.id == null) {
           return await this.add(item);
        }
        await setDoc(doc(this.db, this.collection, item.id), item);
        return item;
    }

    public async updateField (id: string, field: string, value: any) {
        await updateDoc(doc(this.db, this.collection, id), {
            [field]: value,
        });
    };

}

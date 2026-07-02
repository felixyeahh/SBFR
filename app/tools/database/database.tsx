import { getFirestore as getClientFirestore, type Firestore } from "firebase/firestore";
import { collection, addDoc, setDoc, updateDoc, doc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
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

    public async delete (id: string) {
        await deleteDoc(doc(this.db, this.collection, id));
    }

    public async updateField (id: string, field: string, value: any) {
        await updateDoc(doc(this.db, this.collection, id), {
            [field]: value,
        });
    };

}

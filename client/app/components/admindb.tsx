/*import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const { VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_PRIVATE_KEY, VITE_FIREBASE_CLIENT_EMAIL } = process.env;

if (!VITE_FIREBASE_PROJECT_ID || !VITE_FIREBASE_PRIVATE_KEY || !VITE_FIREBASE_CLIENT_EMAIL) {
  throw new Error("Missing Firebase Admin environment variables");
}

const app = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: VITE_FIREBASE_PROJECT_ID,
        privateKey: VITE_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        clientEmail: VITE_FIREBASE_CLIENT_EMAIL,
    })
});

export const adminDb = getFirestore(app);
export const auth = getAuth(app);
*/
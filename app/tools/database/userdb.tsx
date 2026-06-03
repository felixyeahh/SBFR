import { Database } from "./database";
import { Users, type User } from "../userContext";
import { addDoc, setDoc, getDoc, doc, collection} from "firebase/firestore";
import type { Firestore } from "firebase/firestore";

class UserDb extends Database<User> {
    constructor(db: Firestore) {
        super(db, Users.COLLECTION);
    }
}

import {db} from "./database";
export const userdb = new UserDb(db);

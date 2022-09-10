import {collection, doc, getDocs, getDoc, setDoc} from "firebase/firestore";
import {db} from "../firebase";

export default async function createUserReq(uid) {
    await setDoc(doc(db, "users", uid), {});
}

export async function getUserReq(uid) {
    const docRef = doc(db, "users", uid);
    const docs = await getDoc(docRef);

    return docs.exists();
}
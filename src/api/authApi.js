import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export async function googleAuthReq() {
    try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        return signInWithPopup(auth, provider);
    } catch (error) {
        console.warn(error);
    }
}

export async function emailRegisterReq(email, password) {
    try {
        const auth = getAuth();

        return createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.warn(error)
    }
}

export async function emailAuthReq(email, password) {
    const auth = getAuth();

    return signInWithEmailAndPassword(auth, email, password);
}


import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export async function googleAuthReq() {
    try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        return signInWithPopup(auth, provider);
    } catch (error) {
        console.warn(error);
    }
}
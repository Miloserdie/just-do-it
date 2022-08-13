import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MASSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// const firebaseConfig = {
// 	apiKey: "AIzaSyB297J5sDE3qj4BNZowR-f1VhH-xjnlIYQ",
// 	authDomain: "just-do-it-a59df.firebaseapp.com",
// 	databaseURL: "https://just-do-it-a59df-default-rtdb.europe-west1.firebasedatabase.app",
// 	projectId: "just-do-it-a59df",
// 	storageBucket: "just-do-it-a59df.appspot.com",
// 	messagingSenderId: "155771931525",
// 	appId: "1:155771931525:web:ad886e3f393e06522d52ec"
//  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
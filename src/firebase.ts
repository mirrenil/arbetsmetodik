import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOPZjwknIFTXU1sm4-Mo1ByZYZE9QUf9k",
  authDomain: "chubby-dog-d57a4.firebaseapp.com",
  projectId: "chubby-dog-d57a4",
  storageBucket: "chubby-dog-d57a4.appspot.com",
  messagingSenderId: "373666821649",
  appId: "1:373666821649:web:247866ed5447c6b38723b0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

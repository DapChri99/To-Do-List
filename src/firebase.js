import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcvpdZSQLQA5Bp24NTToA8kp_rdTsl81Y",
  authDomain: "trial1999-6bd21.firebaseapp.com",
  projectId: "trial1999-6bd21",
  storageBucket: "trial1999-6bd21.appspot.com",
  messagingSenderId: "780854354170",
  appId: "1:780854354170:web:873ea1201df913157f2943"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
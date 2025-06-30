// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDM-0r_0IyQAryHkJeN_y2ghITRzjni3ug",
  authDomain: "lldcoding-64bbb.firebaseapp.com",
  projectId: "lldcoding-64bbb",
  storageBucket: "lldcoding-64bbb.firebasestorage.app",
  messagingSenderId: "366141246300",
  appId: "1:366141246300:web:214a0f9db7bd1c69058f99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth(app);
const db = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, db };
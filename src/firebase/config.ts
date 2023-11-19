import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyD7kLR6kIfelHLUsu7_oUZIEp3gqWVhVYU",
  authDomain: "reactcursos-c83d2.firebaseapp.com",
  projectId: "reactcursos-c83d2",
  storageBucket: "reactcursos-c83d2.appspot.com",
  messagingSenderId: "916407850564",
  appId: "1:916407850564:web:e40113cabc626bbd0a0e11"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

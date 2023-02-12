import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBo4-15UIB8gfv2-a95tJxlbgHYcsHqCJY",
  authDomain: "pref-quiz-app-dce04.firebaseapp.com",
  projectId: "pref-quiz-app-dce04",
  storageBucket: "pref-quiz-app-dce04.appspot.com",
  messagingSenderId: "676772230657",
  appId: "1:676772230657:web:3f45b58fea8d0161f93200",
  measurementId: "G-YMJ1HDF61J",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export { auth, provider, db };

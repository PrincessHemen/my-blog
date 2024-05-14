import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {} from 'firebase/auth';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC2geFhZzzeWP4XpLHv8KuI2N6NoSvbu7w",
  authDomain: "my-blog-94084.firebaseapp.com",
  projectId: "my-blog-94084",
  storageBucket: "my-blog-94084.appspot.com",
  messagingSenderId: "639263075554",
  appId: "1:639263075554:web:61b986b4d1646bf43242bb",
  measurementId: "G-5DZ6X424QR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
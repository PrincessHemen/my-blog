import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { browserSessionPersistence, setPersistence } from 'firebase/auth';

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
// Export the Firestore instance

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session persistence set to browser session");
  })
  .catch((error) => {
    console.error("Error setting session persistence:", error);
  });

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('profilePic', profilePic);

      console.log(result);
      alert("Sign-in successful");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
    });
};

export const signOutUser = () => {
  return signOut(auth)
    .then(() => {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('profilePic');
      console.log("Sign-out successful");
      alert("Sign-out successful");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
      alert("Error signing out");
    });
};

export const monitorAuthState = (callback) => {
  onAuthStateChanged(auth, callback);
};
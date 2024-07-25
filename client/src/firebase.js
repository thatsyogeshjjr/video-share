// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "video-share-bedbd.firebaseapp.com",
  projectId: "video-share-bedbd",
  storageBucket: "video-share-bedbd.appspot.com",
  messagingSenderId: "925381351582",
  appId: "1:925381351582:web:c56e77e5ddb6b75173438f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;

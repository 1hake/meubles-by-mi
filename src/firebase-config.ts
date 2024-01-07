import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: "AIzaSyAexrhrIjr9t8_jxNz7nT3Ft9pmA2fg67s",
  authDomain: "meublesbymi.firebaseapp.com",
  projectId: "meublesbymi",
  storageBucket: "meublesbymi.appspot.com",
  messagingSenderId: "971133831930",
  appId: "1:971133831930:web:fd4c71b237e8d354be5743",
  measurementId: "G-ZXSJP8T8SH"
};



const app = initializeApp(config);
console.log("🚀 ~ file: firebase-config.ts:20 ~ app", app);

// var firebaseapp = null;

// if (!firebase.apps.length) {
//   firebaseapp = firebase.initializeApp(config);
// } else {
//   firebaseapp = firebase.app(); // if already initialized, use that one
// }

export const projectStorage = getStorage(app);
export const projectFirestore = getFirestore(app);
console.log(
  "🚀 ~ file: firebase-config.ts:36 ~ projectFirestore",
  projectFirestore
);
export const auth = getAuth(app);

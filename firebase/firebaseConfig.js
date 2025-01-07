// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj4pxERDyVyPl71pJMtOfDEZfCLZRIvog",
  authDomain: "jwc-1-29455.firebaseapp.com",
  projectId: "jwc-1-29455",
  storageBucket: "jwc-1-29455.firebasestorage.app",
  messagingSenderId: "351032223167",
  appId: "1:351032223167:web:82650be62c8d29817a6d0a",
  measurementId: "G-7Z08NX00TC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Base de datos Firestore

// Exporta las instancias necesarias
export { app, analytics, db};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmnO1dxQsIxrBS_QojItp34ylSa00M1-E",
  authDomain: "noteslist-vue-4b54a.firebaseapp.com",
  projectId: "noteslist-vue-4b54a",
  storageBucket: "noteslist-vue-4b54a.appspot.com",
  messagingSenderId: "891306156291",
  appId: "1:891306156291:web:8730d9a3156d52f5e54936"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth(app)

export {db, auth}
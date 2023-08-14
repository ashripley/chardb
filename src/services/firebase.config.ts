// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import "firebase/compat/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIUAhdBkIhNU8PeKvVIh23GindG0BEbvE",
  authDomain: "chardb-642dd.firebaseapp.com",
  projectId: "chardb-642dd",
  storageBucket: "chardb-642dd.appspot.com",
  messagingSenderId: "875559509553",
  appId: "1:875559509553:web:2cb75aa62ce32f655bbf10",
}

const firebase = initializeApp(firebaseConfig)
export const firestore = getFirestore(firebase)

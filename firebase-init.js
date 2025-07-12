import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBGsxZItzhrptQTC6UOnfSw7NZWw2bNVB4",
    authDomain: "mmmaraton2025.firebaseapp.com",
    projectId: "mmmaraton2025",
    storageBucket: "mmmaraton2025.firebasestorage.app",
    messagingSenderId: "549045288919",
    appId: "1:549045288919:web:0bed0e1c13e8f418955592"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportamos db para usarlo en script.js
export { db, doc, setDoc, getDoc, onSnapshot };

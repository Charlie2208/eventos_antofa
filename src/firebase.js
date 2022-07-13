import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// import { storage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAnS2f0Fo6-hTmFGFdoWCk5ZDr4fx3g0JA",
    authDomain: "eventos-antofa.firebaseapp.com",
    projectId: "eventos-antofa",
    storageBucket: "eventos-antofa.appspot.com",
    messagingSenderId: "42586045385",
    appId: "1:42586045385:web:5ae3ea69f2a5e0586d8618"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'es';
const db = getFirestore(app);

const currentUserPromise = () => new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
        resolve(user)
    }, e => reject(e))
})

export { app, auth, currentUserPromise, db };
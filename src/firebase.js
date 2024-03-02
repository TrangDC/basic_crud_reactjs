// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAr15QoJ9mGnVOsH20pIhasbEneJSr6hNQ",
    authDomain: "my-project-2595c.firebaseapp.com",
    projectId: "my-project-2595c",
    storageBucket: "my-project-2595c.appspot.com",
    messagingSenderId: "914862445418",
    appId: "1:914862445418:web:d4c47376c7f537ffc68b13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgrsTd2mhdiPRONBSGMWNbhrY6-7L7-RA",
    authDomain: "fir-auth-validation.firebaseapp.com",
    projectId: "fir-auth-validation",
    storageBucket: "fir-auth-validation.appspot.com",
    messagingSenderId: "1025798548092",
    appId: "1:1025798548092:web:4ef0770475f81d641537f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;
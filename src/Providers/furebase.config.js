// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGUxp4L9w-1o3SXht9x3GOVI4obzvaIGA",
  authDomain: "gadgetsbangla.firebaseapp.com",
  projectId: "gadgetsbangla",
  storageBucket: "gadgetsbangla.appspot.com",
  messagingSenderId: "662664726208",
  appId: "1:662664726208:web:f6ba3db63e88a362790f25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
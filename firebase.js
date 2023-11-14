// Import the functions you need from the SDKs you need
import * as firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaQJMeykp6Ad2aB-qiPEXqc9_8sRKqvXo",
  authDomain: "portfoliowebsite-6bc32.firebaseapp.com",
  databaseURL: "https://portfoliowebsite-6bc32-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfoliowebsite-6bc32",
  storageBucket: "portfoliowebsite-6bc32.appspot.com",
  messagingSenderId: "625920926703",
  appId: "1:625920926703:web:1eafd2c3653195ddabcc1a"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else{
    app = firebase.app()
}

const auth = firebase.auth()

export {auth};
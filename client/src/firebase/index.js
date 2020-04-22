import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDxCmjzEi7F9o5ZY9ZGm-kKBO4vOYAGn8k",
  authDomain: "lapor-diri-webapp.firebaseapp.com",
  databaseURL: "https://lapor-diri-webapp.firebaseio.com",
  projectId: "lapor-diri-webapp",
  storageBucket: "lapor-diri-webapp.appspot.com",
  messagingSenderId: "1016828264740",
  appId: "1:1016828264740:web:ffccf58f653dba7a61f3b1",
  measurementId: "G-HKF11Z7Q7C",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };

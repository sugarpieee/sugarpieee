import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"

const firebaseConfig = {

    apiKey: "AIzaSyBMcoBw8fuRCUE1K6g_vE-wG8d8gSy13x0",

    authDomain: "chitr-d1b3c.firebaseapp.com",

    projectId: "chitr-d1b3c",

    storageBucket: "chitr-d1b3c.appspot.com",

    messagingSenderId: "212974703485",

    appId: "1:212974703485:web:93e366390fae0107dff214"

  };

  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

  export default firebase;
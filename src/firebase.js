import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDFALxcp-2Bchq5CNAxdKI3fkjyXcqW2RA",
    authDomain: "fb-crud-react-8e21e.firebaseapp.com",
    databaseURL: "https://fb-crud-react-8e21e.firebaseio.com",
    projectId: "fb-crud-react-8e21e",
    storageBucket: "fb-crud-react-8e21e.appspot.com",
    messagingSenderId: "115570324216",
    appId: "1:115570324216:web:a0fa1db166387402c5810d"
  };

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();

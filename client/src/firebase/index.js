import firebase from '@firebase/app';
import '@firebase/storage';
import '@firebase/firestore';
import '@firebase/auth';

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCpkZmZ0xcTSsYmHMDmkf48GLJXHLVkWJw",
    authDomain: "chareatee-a86d8.firebaseapp.com",
    databaseURL: "https://chareatee-a86d8.firebaseio.com",
    projectId: "chareatee-a86d8",
    storageBucket: "chareatee-a86d8.appspot.com",
    messagingSenderId: "373345118484",
    appId: "1:373345118484:web:ed90572ac76493c5"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const storage = firebase.storage();

export {
  storage, firebase as default
}
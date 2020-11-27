import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCVWBlIaPzVDMCNbhJPKnUCy1kOUyrtuHw",
    authDomain: "my-pet-pal-94791.firebaseapp.com",
    databaseURL: "https://my-pet-pal-94791.firebaseio.com",
    projectId: "my-pet-pal-94791",
    storageBucket: "my-pet-pal-94791.appspot.com",
    messagingSenderId: "681367003877",
    appId: "1:681367003877:web:52f96101019828a12e2a0c",
    measurementId: "G-05B1L9D2LJ"
}
firebase.initializeApp(config);

// storing the user
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// sign in with google method
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


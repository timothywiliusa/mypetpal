import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import {generatePushID} from './pushid-generator'


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

// storing user data in firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    // initialize a doc with the user id
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    //get a snapshot of reference
    const snapShot = await userRef.get();

    // check if the user exists
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
           await userRef.set({
               displayName,
               email,
               createdAt,
               ...additionalData
           }); 
        } catch(error) {
            console.log('user creation error', error.message)
        }
    }
    return userRef;
}

export const getUserProfileSnapshot = async (userAuth) => {
    if(!userAuth) return;

    // initialize a doc with the user id
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    // check if the user exists
    const snapShot = await userRef.get();
    
    return snapShot;
}

var app = firebase.initializeApp(config);

// storing the user data in the front end
export const auth = firebase.auth();
export const firestore = firebase.firestore(app);
export const storage = firebase.storage();


// sign in with google method
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const getCurrentUser = () => {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            return user;
        } else {
            console.log("no signed in user")
          return
        }
      });
}

export const getUserDocumentReference = (userAuth) => {
    if(!userAuth) return;

    // initialize a doc with the user id
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    // check if the user exists
    //const snapShot = await userRef.get();
   
    return userRef;
}

export const createPetProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    // console.log("create pet profile")

    const id = generatePushID()
    // initialize a doc with the user id
    const petRef = firestore.doc(`pets/${id}`);
    

    //get a snapshot of reference
    const petSnapShot = await petRef.get();


    // create pet document
    if(!petSnapShot.exists) {
        const createdAt = new Date();
        const mainOwner = userAuth.uid;
        console.log(userAuth)
        try {
           await petRef.set({
               id,
               createdAt,
               mainOwner,
               ...additionalData
           }); 
        } catch(error) {
            console.log('pet creation error', error.message)
        }
    }
    return id;
}

export const createPetInUserProfileDocument = async (userAuth,id, additionalData) => {
    if(!userAuth) return;

    console.log("creating pet id", id, "for user", userAuth)

    // initialize a doc with the user id
    const petRef = firestore.doc(`users/${userAuth.uid}/pets/${id}`);
    

    // get a snapshot of reference
    const petSnapShot = await petRef.get();


    // create pet document
    if(!petSnapShot.exists) {
        const createdAt = new Date();
        const mainOwner = true;
        console.log(userAuth)
        try {
           await petRef.set({
               createdAt,
               mainOwner,
               id,
               ...additionalData
           }); 
        } catch(error) {
            console.log('pet creation error', error.message)
        }
    }
    return petRef;
}
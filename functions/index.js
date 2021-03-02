const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = 'd-a98fe9823d544828b98f1cb70b1ff224';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(API_KEY);
exports.firestoreEmail = functions.firestore.document('users/{userId}/friends/{friendId}')
    .onCreate((snapshot, context) =>{
        const userId = context.params.userId;
        const friendId = context.params.friendId;
        // console.log('hello!!!! :)');
        // const userEmail = snapshot.data();
        // console.log(userEmail.toString().charAt(0), '<---- user email bro');
        // console.log(userEmail.toString(), '<---- user email bro');
        // console.log(userEmail.toString().indexOf(":"), '<---- user email bro');
        const db = admin.firestore();
        console.log('cmon man');
        return db.collection('users').doc(userId).collection('friends').doc(friendId).get().then(doc =>{
            const user = doc.data();
            const msg = {
                to: user.email,
                from: 'frithp@oregonstate.edu',
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            };
            return sgMail.send(msg)
        })
        .then(()=> console.log('email sent')).catch(err => console.log(err))
    });
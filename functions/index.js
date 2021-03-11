const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = 'd-a98fe9823d544828b98f1cb70b1ff224';

const sgMail = require('@sendgrid/mail');
const { firestore } = require("firebase-admin");
sgMail.setApiKey(API_KEY);
exports.firestoreEmail = functions.firestore.document('users/{userId}/friends/{friendId}')
    .onCreate((snapshot, context) =>{
        const userId = context.params.userId;
        const friendId = context.params.friendId;

        const db = admin.firestore();
        console.log('cmon man');
        return db.collection('users').doc(userId).collection('friends').doc(friendId).get().then(doc =>{
            const user = doc.data();
            const msg = {
                to: user.email,
                from: 'frithp@oregonstate.edu',
                subject: 'Add a new friend on My Pet Pal!',
                body: 'localhost:3000/friends/add-friend/'+userId+'/'+friendId,
                text: 'localhost:3000/friends/add-friend/'+userId+'/'+friendId,
                html: '<strong>'+'localhost:3000/friends/add-friend/'+userId+'/'+friendId+'</strong>',
            };
            return sgMail.send(msg)
        })
        .then(()=> console.log('email sent')).catch(err => console.log(err))
    });
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
        const userRef = db.collection('users').doc(userId);
        return userRef.get().then((doc)=>{
            const docData = doc.data();
            const userEmail = docData.email;
            const snapData = snapshot.data();
            const snapReceived = snapData.received;
            
        //console.log('cmon man ');
        if(!snapReceived){
            const newRef = db.collection('users').doc(userId).collection('friends').doc(friendId);
            return newRef.get().then(doc =>{
                const user = doc.data();
                //console.log(friendId,": ", user.received);
                //if(user.receieved){
                const msg = {
                    to: user.email,
                    from: 'frithp@oregonstate.edu',
                    subject: 'Add a new friend on My Pet Pal!',
                    html: '<strong>'+'localhost:3000/friends/add-friend/'+userEmail+'</strong>',
                };
                return sgMail.send(msg).then(()=> console.log('email sent to receiver'));
                //}
            });
        }else {
            return console.log("email of sender, not sending")
        }
        })   
        
    });
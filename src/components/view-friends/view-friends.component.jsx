import React, { Fragment, useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase.utils'
import firebase from 'firebase/app';
import { v4 as uuidv4} from 'uuid';
import {useParams} from 'react-router';
import { Redirect } from 'react-router-dom';

import './view-friends.styles.scss';

function ViewFriends({currentUser}){
    // const [cUser, setCUser] = useState([]);
    const [friends1, setFriends1] = useState([]);
    const [loading, setLoading] = useState(false);
    //const [friends2, setFriends2] = useState([]);

    useEffect(() =>{
        function getFriends(){
            firebase.auth().onAuthStateChanged(function(user){
            if(user){
                let ref = firestore.collection('users').doc(user.uid);
                ref = ref.collection('friends').where('accepted', '==', true);
                ref.get().then((item)=>{
                    const items = item.docs.map((doc)=>doc.data());
                    setFriends1(items);
                    setLoading(false);
                });
            }
            })
        }
        getFriends();        
    },[]);

    const {id, uid1, uid2} = useParams(); 
    if(id){
        firebase.auth().onAuthStateChanged(function(user){
            if(id === 'add-friend' && uid2 === user.id){
                const ref = firestore.collection('users').doc(uid1).get();
                ref.then((doc)=>{
                    const docRef = doc.data();
                        console.log(docRef.email);
                        if(docRef.email < user.email){
                            firestore.collection('users').doc(uid2).collection('friends').doc(docRef.email + user.email).set({
                                email: docRef.email,
                                id: uuidv4(),
                                accepted: true
                            })
                            firestore.collection('users').doc(uid1).collection('friends').doc(docRef.email + user.email).set({
                                accepted: true
                            })
                        } else{
                            firestore.collection('users').doc(uid2).collection('friends').doc(user.email + docRef.email).set({
                                email: docRef.email,
                                id: uuidv4(),
                                accepted: true
                            })
                            firestore.collection('users').doc(uid1).collection('friends').doc(user.email + docRef.email).set({
                                accepted: true
                            })
                        }
                });
            }
        })
        return <Redirect to='/friends'/>
    }

    if(loading){
        return<h1>loading..</h1>;
    }

    if(currentUser){
        return (
            <Fragment>
                <h1>Friends</h1>
                {friends1.map((friend) =>(
                    <div className='friend' key={friend.id}>
                        <h2 style={{marginLeft:'1%'}} >{friend.email}</h2>
                    </div>
                ))}
            </Fragment>
        );
    } else{
        return<h1>loading...</h1>;
    } 
}

export default ViewFriends;

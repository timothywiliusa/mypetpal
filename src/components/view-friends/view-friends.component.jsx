import React, { Fragment, useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase.utils'
import firebase from 'firebase/app';

import './view-friends.styles.scss';

function ViewFriends({currentUser}){
    const [friends1, setFriends1] = useState([]);
    const [loading, setLoading] = useState(false);
    //const [friends2, setFriends2] = useState([]);

    useEffect(() =>{
        function getFriends(){
            firebase.auth().onAuthStateChanged(function(user){
            if(user){
                let ref = firestore.collection('users').doc(user.uid).collection('friends');
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

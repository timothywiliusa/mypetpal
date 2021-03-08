import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase.utils'
import firebase from 'firebase/app';
import { v4 as uuidv4} from 'uuid';
import {useParams} from 'react-router';
import { Redirect } from 'react-router-dom';
import './view-friends.styles.scss';
import FriendChat from '../../components/friend-chat/friend-chat.component';


function ViewFriends({currentUser}){
    const [friends1, setFriends1] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chat,setChat] = useState(false);
    const [friend, setFriend] = useState("h");
    const [user, setUser] = useState();
    const [query, setQuery] = useState();

    useEffect(() =>{
        function getFriends(){
            firebase.auth().onAuthStateChanged(function(user){
            if(user){
                setUser(user);
                let ref = firestore.collection('users').doc(user.uid);
                ref = ref.collection('friends').where('accepted', '==', true).limit(10);
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
            if(user){
                console.log(user.uid);
                if(id === 'add-friend' && uid2 === user.uid){
                    console.log('hey');
                    const ref = firestore.collection('users').doc(uid1).get();
                    ref.then((doc)=>{
                        const docRef = doc.data();
                        console.log(doc.id);
                        firestore.collection('users').doc(uid2).collection('friends').doc(doc.id).set({
                            email: docRef.email,
                            id: uuidv4(),
                            accepted: true
                        })
                        firestore.collection('users').doc(uid1).collection('friends').doc(uid2).set({
                            accepted: true,
                            email: user.email,
                            id: uuidv4()
                        })
                    });
                }
            }
        })
        console.log(uid1, uid2);
        return <Redirect to='/friends'/>
    }


    if(loading){
        return<h1>loading..</h1>;
    }
    function toggle(e){
        setFriend(e.target.id);
        var qString = '';
        if(e.target.id < user.email){qString = e.target.id+user.email;} else{qString = user.email+e.target.id;}
        console.log(qString, ' ', user.uid);
        setQuery(firestore.collection('chat').doc(qString).collection('chat'));
        if(!chat){setChat(true)}else if(e.target.id === friend || friend === "h"){
            console.log(chat);
            setChat(!chat);
        }
    }

    if(currentUser){
        return (
            <div className='friends-holder'>
                <h1>Friends</h1>
                <div className='friends-list'>
                {friends1.map((friend) =>(
                    <div className='friend' key={friend.email}>
                        <div className='email' style={{marginLeft:'1%'}} >{friend.email}</div>
                        <button id={friend.email} className='toggle' onClick={toggle}>chat</button>
                    </div>
                ))}
                </div>
                {chat && (
                    <div className='chat'><FriendChat chatReference={query}/></div>
                )}
            </div>
        );
    } else{
        return<h1>Loading..</h1>;
    } 
}

export default ViewFriends;

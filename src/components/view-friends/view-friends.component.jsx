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
    const [chatId, setChatId] = useState();
    const [friendRef, setFriendRef] = useState();
    const [bool, setBool] = useState(false);
    
    useEffect(() =>{
        function getFriends(){
            firebase.auth().onAuthStateChanged(function(user){
            if(user){
                setUser(user);
                let ref = firestore.collection('users').doc(user.uid);
                ref = ref.collection('friends').where('accepted', '==', true);
                setFriendRef(ref);
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

    async function addFriends(user){
        let friendRef = firestore.collection('users').doc(user.uid);
        friendRef = friendRef.collection('friends');
        await friendRef.where('email', '==', uid1).get().then(async(querySnapShot) =>{
            console.log('heyeyheye');
            await querySnapShot.forEach(async(doc) =>{
                let docData = doc.data();
                //console.log(doc.id);
                if(docData.received){
                    const ref = firestore.collection('users').doc(doc.id);
                    const chatId = uuidv4();
                    await ref.get().then(async(doc1)=>{
                        const docRef = doc1.data();
                        //console.log('docid', doc1.id);
                        await firestore.collection('users').doc(user.uid).collection('friends').doc(doc1.id).set({
                            email: docRef.email,
                            accepted: true,
                            chatId: chatId
                        })
                        await firestore.collection('users').doc(doc.id).collection('friends').doc(user.uid).set({
                            accepted: true,
                            email: user.email,
                            chatId: chatId
                        })
                    });
                }
            })
        })
        console.log('adding...');
        setTimeout(function (){
        let ref = firestore.collection('users').doc(user.uid);
        ref = ref.collection('friends').where('accepted', '==', true);
        ref.get().then((item)=>{
            const items = item.docs.map((doc)=>doc.data());
            setFriends1(items);
            setLoading(false);
        });
        }, 1000);
        console.log('added!');
    }

    const {id, uid1, uid2} = useParams();
    if(id){
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                setUser(user);
                
                //console.log(user.uid);
                if(id === 'add-friend'){
                    //console.log('hey');
                    addFriends(user);
                }
            }

        })
        //console.log(uid1, uid2);
        return <Redirect to='/friends'/>
    }


    if(loading){
        return<h1>loading..</h1>;
    }

    async function toggle(e){
        
        setFriend(e.target.id);

        let ref = await firestore.collection('users').doc(user.uid);
        ref = ref.collection('friends').where('email', '==', e.target.id).get();
        
        await ref.then((querySnapShot) =>{
            querySnapShot.forEach((doc) =>{
                let docData = doc.data();
                setChatId(docData.chatId);
                setQuery(firestore.collection('chat').doc(doc.data().chatId).collection('chat'));
            })
        })
        
        if(!chat){setChat(true)}else if(e.target.id === friend || friend === "h"){
            setChat(!chat);
        }
    }

    if(user){
        return (
            <div className='friends-holder'>
                <h1 className='header'>Friends</h1>
                <div className='friends-list'>
                {friends1.map((friend) =>(
                    <div className='friend' key={friend.email}>
                        <div className='email' style={{marginLeft:'1%'}} >{friend.email}</div>
                        <button id={friend.email} className='toggle' onClick={toggle}>chat</button>
                    </div>
                ))}
                </div>
                {chat && (
                    <div className='chat'>
                        <div className='email'>{friend}</div>
                        <div className='friend-chat'>
                            <FriendChat chatReference={query}/>
                        </div>
                    </div>
                )}
            </div>
        );
    } else{
        return<h1>Loading..</h1>;
    } 
}

export default ViewFriends;

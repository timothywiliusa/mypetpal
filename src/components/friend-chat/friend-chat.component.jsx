import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase.utils'
import firebase from 'firebase/app';
import './friend-chat.styles.scss';


function FriendChat({chatReference}){
    const [chat, setChat] = useState([])
    chatReference.get().then((item)=>{
        const items = item.docs.map((doc)=>doc.data());
        //console.log(items);
        setChat(items);
    })
    return(<div>{chatReference && chat.map(msg => <ChatMessage key={msg.id} message={msg}/>)}</div>);
}

function ChatMessage(props){
    const {text,uid} = props.message;
    const messageClass = uid === firebase.auth().currentUser.uid ? 'sent' : 'received';


    return(
        <p>{text}</p>)
}

export default FriendChat;
import React, { useState } from 'react';
import firebase from 'firebase/app';
import './friend-chat.styles.scss';
import { v4 as uuidv4} from 'uuid';

function FriendChat({chatReference}){
    const [chat, setChat] = useState([]);
    const [formValue, setFormValue] = useState('');
    const orderedChat = chatReference.orderBy("createdAt");
    orderedChat.get().then((item)=>{
        const items = item.docs.map((doc)=>doc.data());
        //console.log(items);
        setChat(items);
    })
    

    const sendMessage = async(e) =>{
        e.preventDefault();

        const{uid} = firebase.auth().currentUser;
        if(formValue !== ''){
            await chatReference.add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                id: uuidv4(),
                uid
            });
        }
        setFormValue('');
    }
    return(
        <>
            <div >
                {chatReference && chat.map(msg => <ChatMessage key={msg.id} message={msg} msgid={msg.id}/>)}
            </div>
            <form className="send" onSubmit={sendMessage}>
                <input value={formValue} onChange={(e)=> setFormValue(e.target.value)}></input>
                <button type="submit">send</button>
            </form>
        </>
    )
}

function ChatMessage(props){
    const {text,uid} = props.message;
    const messageClass = uid === firebase.auth().currentUser.uid ? 'sent' : 'received';

    return(
        <div className="ch">
            <div className={`message ${messageClass}`}>
               <div>{text}</div>
            </div>
        </div>
    )
}

export default FriendChat;
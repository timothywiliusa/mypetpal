import React, { useState, useRef } from 'react';
import firebase from 'firebase/app';
import { firestore } from '../../firebase/firebase.utils'
import './friend-chat.styles.scss';
import { v4 as uuidv4} from 'uuid';
import CustomButton from '../custom-button/custom-button.component';


function FriendChat({chatReference}){
    const [chat, setChat] = useState([]);
    const [formValue, setFormValue] = useState('');
    const [scroll,setScroll] = useState(true);
    const dummy = useRef();
    const silly = useRef();
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
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    // const scrollToBottom = () =>{
    //     console.log('scroll');
    //     if(dummy.current){
    //         dummy.current.scrollIntoView({ behavior: 'smooth' });
    //         setScroll(false);
    //         return<div/>
    //     }
    //     return<div/>
    // }
    
    return(
        <>
            
            <div className='msgs'>
                {chatReference && chat.map(msg => <ChatMessage key={msg.id} message={msg} msgid={msg.id}/>)}
                <a ref={dummy}></a>
            </div>
            <div className="sendbox">
            <form className="send" onSubmit={sendMessage}>
                <input className="textinput" value={formValue} onChange={(e)=> setFormValue(e.target.value)}></input>
                <CustomButton isSendButton type="submit">send</CustomButton>
            </form>
            </div>
            
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
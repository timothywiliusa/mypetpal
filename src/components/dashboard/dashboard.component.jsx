import React, { Component, useState, useEffect } from 'react';
import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button.component';
import { firestore } from '../../firebase/firebase.utils';
import './dashboard.styles.scss';
import firebase from 'firebase/app';
import DateTimePicker from 'react-datetime-picker';
import { v4 as uuidv4} from 'uuid';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayName: '',
            friendEmail: '',
            id: '',
            dateTime: new Date(),
            reminder: ''
        };     
    }



    handleChange = e => {
        const { name, value } = e.target;

        this.setState({[name]: value})
    }
    onChange = e => {
        const{value} = e.target;

        this.setState({dateTime: {value}})
    }

    

    render(){
        const { reminder, dateTime } = this.state; 
        return(
            <div className='add-reminder'>
                
                <ViewReminders></ViewReminders>

            </div>
        )
    }
}

function ViewReminders(){
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [uRef, setURef] = useState();
    const [formValue, setFormValue] = useState('');
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() =>{
        function getReminder(){
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
            let userRef = firestore.collection('users').doc(user.uid);
            setURef(userRef);
            userRef.get().then((item)=>{
                setUser(item);
            })
            userRef.collection('reminders').orderBy('dateTime').get().then((item)=>{
                const items = item.docs.map((doc)=>doc.data());
                //console.log(items);
                setReminders(items);
            })
        }
        })
        }
        getReminder();
    },[]);



    if(loading){
        return<h1>loading..</h1>;
    }
    
    async function toggle(e){
        console.log(e.target.id);
        var bool = e.target.value;
        if(bool === "false"){
            bool = !bool;
        }
        //console.log(bool);
        let remRef = firestore.collection('users').doc(user.id).collection('reminders').doc(e.target.id);
        await remRef.update({
            checked: !bool,
            newbool: "gg"
        })

        uRef.get().then((item)=>{
            setUser(item);
        })
        uRef.collection('reminders').orderBy('dateTime').get().then((item)=>{
            const items = item.docs.map((doc)=>doc.data());
            //console.log(items);
            setReminders(items);
        })

    } 

    const sendMessage =  async(e) => {
        e.preventDefault();
        

        console.log('making reminder');
        try {
            const{uid} = firebase.auth().currentUser;
            let query = firestore.collection('users').doc(uid).collection('reminders');
            const id = uuidv4();
            query.doc(id).set({
                text: formValue,
                dateTime: dateTime,
                id: id,
                checked: false
            })
            setFormValue('');
        } catch(error) {
            console.error(error);
        }
        uRef.get().then((item)=>{
            setUser(item);
        })
        uRef.collection('reminders').orderBy('dateTime').get().then((item)=>{
            const items = item.docs.map((doc)=>doc.data());
            //console.log(items);
            setReminders(items);
        })
    };

    const test = async(e) => {
        console.log(e);
    }

        return (
            <div className='friends-holder'>
                <h2 className='title'>Create a Reminder</h2>
                <form className='add-reminder-form' onSubmit={sendMessage}>
                    <FormInput name="textinput" value={formValue} onChange={(e)=> setFormValue(e.target.value)}></FormInput>
                    <DateTimePicker
                        name='dateTime'
                        value={dateTime}
                        onChange={(e)=> setDateTime(e)}
                        label={'What would you like to be reminded about?'}
                        required
                    />
                    <CustomButton type='submit'>
						Create Reminder
					</CustomButton>
                </form>
                <h1 className='header'>Reminders</h1>
                <div className='friends-list'>
                {reminders.map((reminder) =>(
                    <div className='reminder' key={reminder.id}>
                        <form>
                        <input
                            className="checked"
                            onChange={toggle}
                            type="checkbox"
                            checked={reminder.checked}
                            value={reminder.checked}
                            id={reminder.id}
                        />
                        </form>
                        <div className='text' style={{marginLeft:'1%'}} >{reminder.text}</div>
                        <div className='date' style={{marginLeft:'1%'}} >{new Date(reminder.dateTime.toMillis()).toUTCString()}</div>
                    </div>
                ))}
                </div>
            </div>
        );
}

export default Dashboard;
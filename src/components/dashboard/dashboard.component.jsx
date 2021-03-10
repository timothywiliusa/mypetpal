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

    handleSubmit =  async e => {
        e.preventDefault();
        
        const { reminder, dateTime } = this.state;
        console.log('making friends');
        try {
            const{uid} = firebase.auth().currentUser;
            let query = firestore.collection('users').doc(uid).collection('reminders');
            query.add({
                text: reminder,
                dateTime: dateTime,
                id: uuidv4()
            })
            this.setState({reminder: ''});
        } catch(error) {
            console.error(error);
        }
    };

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
                <h2 className='title'>Add a Friend</h2>
                <form className='add-reminder-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='reminder'
                        value={reminder}
                        handleChange={this.handleChange}
                        label={'What would you like to be reminded about?'}
                        required
                    />
                    <DateTimePicker
                        name='dateTime'
                        value={dateTime}
                        onChange={(dateTime)=> this.setState({dateTime:dateTime})}
                        label={'What would you like to be reminded about?'}
                        required
                    />
                    <CustomButton type='submit'>
						Create Reminder
					</CustomButton>
                </form>
                <ViewReminders></ViewReminders>

            </div>
        )
    }
}

function ViewReminders(){
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chat,setChat] = useState(false);
    const [friend, setFriend] = useState("h");
    const [user, setUser] = useState();
    const [query, setQuery] = useState();

    // useEffect(() =>{
    //     function getReminders(){
    //         firebase.auth().onAuthStateChanged(function(user){
    //         if(user){
    //             setUser(user);
    //             let ref = firestore.collection('users').doc(user.uid);
    //             ref = ref.collection('reminders');
    //             ref.get().then((item)=>{
    //                 const items = item.docs.map((doc)=>doc.data());
    //                 setReminders(items);
    //                 setLoading(false);
    //             });
    //         }
    //         })
    //     }
    //     getReminders();        
    // },[]);
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
        firestore.collection('users').doc(user.uid).collection('reminders').orderBy('dateTime').get().then((item)=>{
            const items = item.docs.map((doc)=>doc.data());
            //console.log(items);
            setReminders(items);
        })
    }
    })


    if(loading){
        return<h1>loading..</h1>;
    }
    

    if(firebase.auth().currentUser){
        return (
            <div className='friends-holder'>
                <h1 className='header'>Friends</h1>
                <div className='friends-list'>
                {reminders.map((reminder) =>(
                    <div className='friend' key={reminder.id}>
                        <div className='text' style={{marginLeft:'1%'}} >{reminder.text}</div>
                        <div className='date' style={{marginLeft:'1%'}} >{new Date(reminder.dateTime.toMillis()).toUTCString()}</div>
                    </div>
                ))}
                </div>
            </div>
        );
    } else{
        return<h1>Loading..</h1>;
    } 
}

export default Dashboard;
import React, { Component } from 'react';
import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button.component';
import { firestore } from '../../firebase/firebase.utils';
import './add-friend.styles.scss';
import firebase from 'firebase/app';


class AddFriend extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayName: '',
            friendEmail: '',
            id: '',
            user: null
        };     
    }
    componentDidMount(){

    }

    handleSubmit =  async e => {
        e.preventDefault();
        var that = this;
        const { friendEmail } = this.state;
        firebase.auth().onAuthStateChanged(function(user){
        
        //const ref = firestore.collection('friends');
        // const ref1 =ref.where(friendEmail,'==',this.props.currentUser.email);
        // const ref2 =ref.where(this.props.currentUser.email,'==',friendEmail);
        // ref1.get().then((item)=>{
        //     const items = item.docs.map((doc)=>doc.data());
        //     console.log(items);
        //     if(items.length !== 0){
        //         console.log('returning1');
        //         return;
        //     }
        // })
        // ref2.get().then((item)=>{
        //     const items = item.docs.map((doc)=>doc.data());
        //     console.log(items);
        //     if(items.length !== 0){
        //         console.log('returning2');
        //         return;
        //     }
        // })
        console.log('making friends');
        try {
            let query = firestore.collection('users').where('email', '==', friendEmail).get();
            query.then(function(querySnapshot){
                querySnapshot.forEach(function(doc){ if(!querySnapshot.empty){  
                //console.log(doc.id);
                    if(friendEmail === user.email){
                        console.log('that is you');
                        that.setState({
                            friendEmail: ''
                        })
                    } else{
                        //console.log(user.uid);
                        firestore.collection('users').doc(user.uid).collection('friends').doc(doc.id).set({
                            email: friendEmail,
                            accepted: false
                        })
                        firestore.collection('users').doc(doc.id).collection('friends').doc(user.uid).set({
                            email: user.email,
                            accepted: false,
                            received: true
                        })
                    
                        that.setState({
                            friendEmail: ''
                        })
                    }
                } else {
                    console.log('No user with that email!');
                    this.setState({
                    friendEmail: ''
                    })
                }});
            })
        } catch(error) {
            console.error(error);
        }
        })
    };

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({[name]: value})
    }

    render() {
        const { friendEmail } = this.state; 
        return(
            <div className='add-friend'>
                <h2 className='title'>Add a Friend</h2>
                <form className='add-friend-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='email'
                        name='friendEmail'
                        value={friendEmail}
                        handleChange={this.handleChange}
                        label={'Friend\'s email'}
                        required
                    />
                    <CustomButton type='submit'>
						ADD FRIEND
					</CustomButton>
                </form>
            </div>
        )
    }
}

export default AddFriend;
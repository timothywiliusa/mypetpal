import React, { Component } from 'react';
import { v4 as uuidv4} from 'uuid';
import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button.component';
import { firestore } from '../../firebase/firebase.utils';
//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

class AddFriend extends Component {
    constructor(){
        super();
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

        const { friendEmail } = this.state;

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
            query.then(querySnapshot => { if(!querySnapshot.empty){  
                if(this.props.currentUser.email < friendEmail){
                    firestore.collection('users').doc(this.props.currentUser.id).collection('friends').doc(this.props.currentUser.email+friendEmail).set({
                        email: friendEmail,
                        id: uuidv4()
                    })
                } else if(this.props.currentUser.email > friendEmail){
                    firestore.collection('users').doc(this.props.currentUser.id).collection('friends').doc(friendEmail+this.props.currentUser.email).set({
                        email: friendEmail,
                        id: uuidv4()
                    })
                } else{
                    console.log('That is you!!!');
                    this.setState({
                        friendEmail: ''
                    })
                }
                this.setState({
                    friendEmail: ''
                })
            } else {
                console.log('No user with that email!');
                this.setState({
                    friendEmail: ''
                })
            }});
        } catch(error) {
            console.error(error);
        }
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
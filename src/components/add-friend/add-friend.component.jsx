import React, { Component } from 'react';

import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button.component';
import { firestore } from '../../firebase/firebase.utils';


class AddFriend extends Component {
    constructor(){
        super();
        this.state = {
            displayName: '',
            friendEmail: '',
            user: null
        };     
    }


    handleSubmit =  async e => {
        e.preventDefault();

        const { friendEmail } = this.state;



        try {
            firestore.collection('friends').doc().set({
                name1: friendEmail,
                name2: this.props.currentUser.email
            })

            this.setState({
                friendEmail: ''
            })
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
                <div className='friend-requests'>
                    Hello
                </div>
            </div>
        )
    }
}

export default AddFriend;
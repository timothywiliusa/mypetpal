import React, { Component } from 'react';

import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './sign-up.styles.scss';



class SignUp extends Component {
    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            address: ''
        };     
    }

    handleSubmit =  async e => {
        e.preventDefault();

        const { displayName, email, password, confirmPassword, firstName, lastName, address} = this.state;

        if (password !== confirmPassword) {
            alert("passwords don't match")
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
                await createUserProfileDocument(user, {displayName, firstName, lastName, address});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                address: ''
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
<<<<<<< HEAD
        const {displayName, email, password, confirmPassword, firstName, lastName, address} = this.state;
=======
        const {displayName, email, password, confirmPassword } = this.state;
>>>>>>> parent of af7e04b... Committing
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        handleChange={this.handleChange}
                        label='Display Name*'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        handleChange={this.handleChange}
                        label='Email*'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        handleChange={this.handleChange}
                        label='Password*'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        label='Confirm Password*'
                        required
                    />
<<<<<<< HEAD
                    <FormInput
                        type='firstName'
                        name='firstName'
                        value={firstName}
                        handleChange={this.handleChange}
                        label='First Name*'
                        required
                    />
                    <FormInput
                        type='lastName'
                        name='lastName'
                        value={lastName}
                        handleChange={this.handleChange}
                        label='Last Name*'
                        required
                    />
                    <FormInput
                        type='address'
                        name='address'
                        value={address}
                        handleChange={this.handleChange}
                        label='Address'
                        optional
                    />
                    <FormInput
                        type='address'
                        name='address'
                        value={address}
                        handleChange={this.handleChange}
                        label='Phone Number'
                        optional
                    />
                    <CustomButton type='submit'>
							CREATE ACCOUNT
					</CustomButton>
=======
                    <CustomButton type='submit'>SIGN UP</CustomButton>
>>>>>>> parent of af7e04b... Committing
                </form>
                    
            </div>
        )
    }
}

export default SignUp;
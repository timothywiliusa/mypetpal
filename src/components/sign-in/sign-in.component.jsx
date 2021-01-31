 import React, { Component } from 'react';

import FormInput from '../form-input/form-input-component';
import { Link } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		const { email, password } = this.state;
		
		try {
			await auth.signInWithEmailAndPassword(email,password);
			this.setState({ email: '', password: '' });
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = (e) => {
		const { value, name } = e.target;

		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className='sign-in'>
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						name='email'
						type='email'
						handleChange={this.handleChange}
						value={this.state.email}
						label='email'
						required
					/>
					<FormInput
						name='password'
						type='password'
						handleChange={this.handleChange}
						value={this.state.password}
						label='password'
						required
					/>
					<div className='buttons' >
					<CustomButton type='submit' value='Submit Form'>sign in</CustomButton>
					<CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>sign in with google</CustomButton>
					<div className='question'>First time signing up?</div>
					<Link className="create" to="/signup"> Create Account </Link>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;

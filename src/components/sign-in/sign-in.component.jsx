import React, { Component } from 'react';

import './sign-in.styles.scss';

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();

		this.setState({ email: '', password: '' });
	};

	handleChange = (e) => {
		const { value, name } = e.target;

		this.setState({ [name]: value });
	};

	render() {
		return (
			<div>
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<input name="email" type="email" onChange={this.handleChange} value={this.state.email} required />
					<label>Email</label>
					<input
						name="password"
						type="password"
						onChange={this.handleChange}
						value={this.state.password}
						required
					/>
					<label>Password</label>
					<input type="submit" value="SubmitForm" />
				</form>
			</div>
		);
	}
}

export default SignIn;

import React from 'react';
import './login.styles.scss';
import SignIn from '../../components/sign-in/sign-in.component';

const login = () => (
	<div className="login">
		<SignIn />
		<SignUp />
	</div>
);

export default login;

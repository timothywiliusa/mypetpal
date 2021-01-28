import React from 'react';
import './login.styles.scss';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const login = () => (
	<div className="login">
		<SignIn />
	</div>
);

export default login;

import React from 'react';
import './signup.styles.scss';
import SignUp from '../../components/sign-up/sign-up.component';

const signup = ({currentUser}) => (
	<div className="signup">
		<SignUp currentUser={currentUser}/>
	</div>
);

export default signup;

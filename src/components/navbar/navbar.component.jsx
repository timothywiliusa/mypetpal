import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils'

import { ReactComponent as Logo } from '../../assets/paw-black-shape.svg';

import './navbar.styles.scss';

const Navbar = ({currentUser}) => (
	<div className="navbar">
        <div className="logo-container">
            <Link to="/">
                <Logo className="logo" /> 
            </Link>
        </div>
		

		<div className="options">
			<Link className="option" to="/support">
				HELP
			</Link>
			<Link className="option" to="/contact">
				CONTACT
			</Link>
            <Link className="option" to="/userprofile">
                USERPROFILE
            </Link>
            <Link className="option" to ="/userinfobyid">
                View Userinfo by Id
            </Link>
            {
                currentUser ?
                    <div className='option' onClick={() => auth.signOut()}>
                        SIGN OUT
                    </div>
                    :
                    <Link className="option" to="/login">
                        SIGN IN
                    </Link>
            }
			
		</div>
	</div>
);

export default Navbar;

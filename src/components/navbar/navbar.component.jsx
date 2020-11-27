import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils'

//import { ReactComponent as Logo } from '../../assets/crown.svg';

import './navbar.styles.scss';

const Navbar = ({currentUser}) => (
	<div className="navbar">
		<Link className="logo-container" to="/">
			{/* <Logo className="logo" /> */}
		</Link>

		<div className="options">
			<Link className="option" to="/support">
				HELP
			</Link>
			<Link className="option" to="/contact">
				CONTACT
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

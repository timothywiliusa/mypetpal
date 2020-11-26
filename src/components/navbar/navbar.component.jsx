import React from 'react';
import { Link } from 'react-router-dom';

//import { ReactComponent as Logo } from '../../assets/crown.svg';

import './navbar.styles.scss';

const Navbar = () => (
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
			<Link className="option" to="/signin">
				SIGN IN
			</Link>
		</div>
	</div>
);

export default Navbar;

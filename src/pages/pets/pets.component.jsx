import React from 'react';
import './pets.styles.scss';


import {Route,Switch,Link} from 'react-router-dom'

import PetsDisplay from '../../components/pets-display/pets-display.component'
import NewPet from '../new-pet/new-pet.component'
import CustomButton from '../../components/custom-button/custom-button.component';


const Pets = () => (
	<div>
		<Link to='/pets/new-pet'>
			<CustomButton>
				New Pet
			</CustomButton>
		</Link>

		<PetsDisplay/>
		
	</div>
);

export default Pets;

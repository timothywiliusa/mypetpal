import React from 'react';
import './pets.styles.scss';

import {Route,Switch} from 'react-router-dom'

import PetsDisplay from '../../components/pets-display/pets-display.component'
import NewPet from '../new-pet/new-pet.component'

const Pets = () => (
	<div>
		<PetsDisplay/>
	</div>
);

export default Pets;

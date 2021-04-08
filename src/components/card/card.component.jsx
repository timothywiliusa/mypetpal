import React from 'react';
import './card.styles.scss';

import {Link} from 'react-router-dom'

import CustomButton from '../custom-button/custom-button.component'

export const Card = (props) => (
	<div className="card-container">
		<img className="img" alt="petImage" src={`${props.photoUrl}`} />
		<Link to={`/pet-profile/${props.id}`} >
			<CustomButton type='button'>Check out {props.petName}!</CustomButton>
		</Link>
	</div>
);


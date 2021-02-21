import React from 'react';
import './card.styles.scss';

import {Link} from 'react-router-dom'

import CustomButton from '../custom-button/custom-button.component'

export const Card = (props) => (
	<div className="card-container">
		{/* <img src={`${props.photo.url}`} /> */}
		<p>{props.id}</p>
		<p>pet profile photo</p>
		<p>{props.name}</p>
		<Link to={`/pet-profile/${props.id}`} >
			<CustomButton type='button'>Check me out!</CustomButton>
		</Link>
	</div>
);


import React, { Component } from 'react';
import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';

class Directory extends Component {
	constructor() {
		super();
		this.state = {
			sections: [
				{
					id: 1,
					title: 'pets',
					imageUrl: 'https://i.ibb.co/FWz9XjM/MY-PETS.jpg',
					linkUrl: 'pets'
				},
				{
					id: 2,
					title: 'friends',
					imageUrl: 'https://i.ibb.co/r44Znt3/FRIENDS.jpg',
					linkUrl: 'friends'
				},
				// {
				// 	id: 3,
				// 	title: 'vets',
				// 	imageUrl: 'https://i.ibb.co/MMR4Jfq/VETS.jpg',
				// 	linkUrl: 'vets'
				// },
				{
					id: 3,
					title: 'dash board',
					imageUrl: 'https://i.ibb.co/JcqH4yW/DASH.png',
					linkUrl: 'dashboard',
				},
				{
					id: 5,
					title: 'shop',
					imageUrl: 'https://i.ibb.co/b3QW5c2/hd3demdpraa31.png',
					linkUrl: 'shop',
					size: 'large'
				}
	
			]
		};
	}

	render() {
		return (
			<div className="directory-menu">
				{this.state.sections.map(({ id, ...otherSectionProps }) => (
					<MenuItem key={id} {...otherSectionProps} />
				))}
			</div>
		);
	}
}

export default Directory;

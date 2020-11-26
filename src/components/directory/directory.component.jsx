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
					imageUrl: 'https://www.linkpicture.com/q/MY-PETS.jpg',
					linkUrl: ''
				},
				{
					id: 2,
					title: 'friends',
					imageUrl: 'https://www.linkpicture.com/q/FRIENDS.jpg',
					linkUrl: ''
				},
				{
					id: 3,
					title: 'vets',
					imageUrl: 'https://www.linkpicture.com/q/VETS.jpg',
					linkUrl: ''
				},
				{
					id: 4,
					title: 'dash board',
					imageUrl: 'https://www.linkpicture.com/q/DASH.png',
					linkUrl: '',
					size: 'large'
				},
				{
					id: 5,
					title: 'shop',
					imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
					linkUrl: '',
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

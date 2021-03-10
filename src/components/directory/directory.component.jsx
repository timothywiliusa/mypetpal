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
					linkUrl: 'pets'
				},
				{
					id: 2,
					title: 'friends',
					imageUrl: 'https://www.linkpicture.com/q/FRIENDS.jpg',
					linkUrl: 'friends'
				},
				{
					id: 3,
					title: 'vets',
					imageUrl: 'https://www.linkpicture.com/q/VETS.jpg',
					linkUrl: 'vets'
				},
				{
					id: 4,
					title: 'dash board',
					imageUrl: 'https://www.linkpicture.com/q/DASH.png',
					linkUrl: 'dashboard',
					size: 'large'
				},
				{
					id: 5,
					title: 'shop',
					imageUrl: 'https://www.linkpicture.com/q/dog-swords.jpg',
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

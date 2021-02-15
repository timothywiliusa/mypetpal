import React , {Component} from 'react';
import './new-pet.styles.scss';

import NewPetForm from '../../components/new-pet-form/new-pet-form.component'


class NewPet extends Component{

	constructor(){
		super();
		this.state = {
			petName: '',
			species: ''
		}
	}

	componentDidMount(){
		console.log(this.props.location.state);
		// this.setState({
		// 	petName: petName,
		// 	species: species
		// })
	}

	render(){
		return(
			<div className="new-pet-page">
				helo
				<NewPetForm />
			</div>
		)
	}
}




export default NewPet;

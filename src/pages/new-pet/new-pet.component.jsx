import React , {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import './new-pet.styles.scss';

import { createPetInUserProfileDocument, firestore } from '../../firebase/firebase.utils'

import NewPetForm from '../../components/new-pet-form/new-pet-form.component'


class NewPet extends Component{

	constructor(){
		super();
		this.state = {
			id:'',
			currentPet: null,
			manual: true
		}
	}

    getID = async () => { 
        const id = window.location.pathname.substring(14,40);
		console.log(id)

        return id
    };

	componentDidMount(){

		
		if(window.location.href.length > 34){

			// check if pet exists
			this.getID().then((id) =>{
				this.setState({id: id})
				const documentRef = firestore.doc(`pets/${id}`);
	
				documentRef.onSnapshot(snapShot => {
	
					console.log(snapShot)
					this.setState({
							
									currentPet:{
										...snapShot.data()
									},
									manual: false
						
					});
					
				});				
			})

			// if exists
			

		}
		else{
			console.log(window.location.href.length);
			console.log("do else")
		}
		console.log("hi", window.location.href.length);
	}

	render(){
		console.log("render", this.state)

		if (this.state.manual === true){
			return(
				<div className="new-pet-page">
					<NewPetForm />
				</div>
			)
		}
		else {
			const {currentUser} = this.props
			const {id} = this.state
			const {petName, photoUrl} = this.state.currentPet

			createPetInUserProfileDocument(currentUser,id,{petName, photoUrl})

			return(
				<Redirect to="/pets" />
			)
		}
		
	}
}

const mapStateToProps = ({user}) => ({
	currentUser: user.currentUser
  })
  


export default connect(mapStateToProps)(NewPet);

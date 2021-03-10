import React , {Component} from 'react';
import {auth, getUserDocumentReference, firestore } from '../../firebase/firebase.utils'
import './pets-display.styles.scss';


import {Route,Switch} from 'react-router-dom'
import {Card} from '../card/card.component'





class PetsDisplay extends Component {

	constructor(){
		super()
		this.state = {
			currentUser: null,
			nPets: 0,
			pets: []
		}

	}

	unsubscribeFromAuth = null

	componentDidMount(){

		this.unsubscribeFromAuth = auth.onAuthStateChanged(
			userAuth => {
			  if(userAuth){
				const userRef = firestore().doc(`users/${userAuth.uid}`);
				const petCollectionRef = firestore().collection(`users/${userAuth.uid}/pets`);
				

				userRef.get().then((snapShot) => {
					console.log("user snapshot", snapShot)

					this.setState({
						currentUser: {
						  id: snapShot.id,
						  ...snapShot.data()
						}
					  }
					);
					this.setState({
						nPets: this.state.currentUser.nPets
					});
				})
				
				petCollectionRef.get().then((snapShot) => {
					console.log("snapshot", snapShot)
					this.setState({
						pets: snapShot.docs.map((doc) => doc.data())
					});
					console.log(this.state)
					
				})
			  }
	  
			  
			}
		  );
	}
		
	
	// addPet = (pet) => {
	// 	console.log(pet)
	// 	this.setState({
	// 		pets: [pet, ...this.state.pets]
	// 	});
	// 	console.log(this.state.pets)
	// };

	// deletePet = (id) => {
	// 	this.setState({
	// 		pets: this.state.pets.filter(pet => pet.id !== id)
	// 	})
	// }


	render(){


		const {nPets, pets } = this.state
		if(nPets !== 0){
			return(
				<div>
					<div className="card-list">
						{pets.map((pet) => (
							<Card 
								key={pet.id} 
								id={pet.id}
								petName={pet.petName}
								photoUrl={pet.photoUrl}
							/>
						))} 
					</div>
				</div>
			)
		}
		else {
			return(
				<div>
					Nothing to display
				</div>
			)
		}	

	}
}

export default PetsDisplay;

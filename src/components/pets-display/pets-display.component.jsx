import React , {Component} from 'react';
import {auth, getUserDocumentReference, firestore } from '../../firebase/firebase.utils'
import './pets-display.styles.scss';


import {Route,Switch} from 'react-router-dom'

import {Card} from '../card/card.component'





class PetsDisplay extends Component {

	constructor(){
		super()
		this.state = {
			currentUser : null
		}

	}

	unsubscribeFromAuth = null

	componentDidMount(){

		this.unsubscribeFromAuth = auth.onAuthStateChanged(
			userAuth => {
			  if(userAuth){
				const userRef = getUserDocumentReference(userAuth);
				console.log("userAuth",userAuth)
				console.log("userRef",userRef)

				userRef.onSnapshot(snapShot => {
					console.log("snapshot", snapShot)
				  this.setState({
					currentUser: {
					  id: snapShot.id,
					  ...snapShot.data()
					}
				  },
				  () => {
					//logging current user from a snapshot of the database
					console.log("state",this.state);
				  });
				});
			  }
	  
			  this.setState({ currentUser: userAuth });
			}
		  );
	}
		
	



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

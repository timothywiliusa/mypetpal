import React , {Component} from 'react';
import {auth, getUserDocumentReference, getCurrentUser} from '../../firebase/firebase.utils'
import './pets-display.styles.scss';

import {Route,Switch} from 'react-router-dom'




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

	
		return(
			<div>
				{this.state.currentUser != null ? this.state.currentUser.displayName : null}
			</div>
		)
	}
}

export default PetsDisplay;

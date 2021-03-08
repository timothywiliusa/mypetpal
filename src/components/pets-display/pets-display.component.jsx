import React , {Component} from 'react';
import {auth, getUserDocumentReference } from '../../firebase/firebase.utils'
import './pets-display.styles.scss';





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
				{this.state.currentUser != null ? <h1>{this.state.currentUser.displayName}</h1> : null}
			</div>
		)
	}
}

export default PetsDisplay;

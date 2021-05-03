import React , {Component} from 'react';
import {auth, getUserDocumentReference} from '../../firebase/firebase.utils';
import { Card} from "react-bootstrap";

class Userprofile extends Component {

	constructor(){
		super()
		this.state = {
			currentUser : {
				email: null,
				firstName: null,
				displayName: null,
				address: null,
				phoneNumber: null
			}
		};
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
                <Card>
                    <Card.Body>
                        <h2 className = "text center mb-4"> Profile </h2>
                        <p>{this.state.currentUser.email != null && this.state.currentUser.email != undefined ? "Email: " + this.state.currentUser.email : null}</p>
						<p>{this.state.currentUser.displayName != null && this.state.currentUser.displayName != undefined ? "Display Name: " + this.state.currentUser.displayName : null} </p>
						<p>{this.state.currentUser.firstName != null && this.state.currentUser.firstName != undefined ? "First Name: " + this.state.currentUser.firstName : null} </p>
                        <p>{this.state.currentUser.address != null && this.state.currentUser.address != undefined ? "Address: " + this.state.currentUser.address : null} </p>
                        <p>{this.state.currentUser.phoneNumber != null && this.state.currentUser.phoneNumber != undefined ? "Phone Number: " + this.state.currentUser.phoneNumber : null} </p>
                    </Card.Body>
				</Card>
			</div>
		)
	}
}

export default Userprofile;
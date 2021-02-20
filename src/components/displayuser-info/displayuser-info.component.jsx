import React , {Component} from 'react';
import {auth, getUserDocumentReference, getCurrentUser} from '../../firebase/firebase.utils';
import {Route,Switch} from 'react-router-dom';
import { Card, ListGroup} from "react-bootstrap";

class Userprofile extends Component {

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
                <Card>
                    <Card.Body>
                        <h2 className = "text center mb-4"> Profile </h2>
                        <p>Email: {this.state.currentUser != null ? this.state.currentUser.email : null}</p>
                        <p>User-Id: {this.state.currentUser != null ? this.state.currentUser.id : null} </p>
                        <p>First Name: {this.state.currentUser != null ? this.state.currentUser.firstName : null} </p>
                        <p>Display Name: {this.state.currentUser != null ? this.state.currentUser.displayName : null} </p>
                        <p>Address: {this.state.currentUser != null ? this.state.currentUser.address : null} </p>
                        <p>Phone Number: {this.state.currentUser != null ? this.state.currentUser.phoneNumber : null} </p>
                    </Card.Body>
                </Card>
			</div>
		)
	}
}

export default Userprofile;

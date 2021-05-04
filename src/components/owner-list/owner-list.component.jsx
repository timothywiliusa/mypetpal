import React , {Component} from 'react';
import {auth, getUserDocumentReference, firestore, setMainOwnerTo } from '../../firebase/firebase.utils'


import './owner-list.styles.scss'
import {Route,Switch} from 'react-router-dom'
import {Card} from '../card/card.component'
import CustomButton from '../custom-button/custom-button.component'





class OwnerList extends Component {

	constructor(){
		super()
		this.state = {
			currentPet: null,
			owners: [],
            names: []
            
		}

	}

	unsubscribeFromAuth = null

	componentDidMount(){

		this.unsubscribeFromAuth = auth.onAuthStateChanged(
			userAuth => {
			  if(userAuth){
				const petRef = firestore.doc(`pets/${this.props.id}`);
				const ownersCollectionRef = firestore.collection(`pets/${this.props.id}/owners`);
                

				petRef.get().then((snapShot) => {
					console.log("pet snapshot", snapShot)

					this.setState({
						currentPet: {
						  id: snapShot.id,
						  ...snapShot.data()
						}
					  }
					);
				})

				ownersCollectionRef.get().then((snapShot) => {
					console.log("snapshot", snapShot)
					this.setState({
						owners: snapShot.docs.map((doc) => doc.data())
					});
					console.log(this.state)

				})
			  }
              
              
			}

		  );
	}
		
	



	render(){


		const {owners, currentPet} = this.state

		
        return(
            <div>
                <div className="card-list">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h3>
                        Owners List
                    </h3>
                    <ul>

                
                    {owners.map((owner) => (
                            <div key={owner.uid}>
                                <p className='card-item'>{owner.uid}</p> 
                                <br/>
                                
                                 <CustomButton onClick={()=> {
                                     setMainOwnerTo(currentPet.id,owner.uid, owner.uid)
                                 }}>Set to Main Owner</CustomButton> 
                            </div>
                           
                        
                        // <Card 
                        // 	key={pet.id} 
                        // 	id={pet.id}
                        // 	petName={pet.petName}
                        // 	photoUrl={pet.photoUrl}
                        // />
                    ))} 
                     </ul>
                </div>
            </div>
        )
	}
		

	
}

export default OwnerList;

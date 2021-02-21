import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';

import './pet-profile-hud.styles.scss';
import { auth, signInWithGoogle , firestore} from '../../firebase/firebase.utils';

class PetProfileHUD extends Component {
	constructor(props) {
		super(props);

		this.state = {
            petID: '',
            petName: '',
            mainOwner: '',
            age: '',
            sex: '',
            species: '',
            weight: '',
            neutered: null
		};
    }
    
    unsubscribeFromAuth = null;

	componentDidMount(){
        
        const id = window.location.pathname.substring(13,33);
        this.setState({petID: id})

        

        this.unsubscribeFromAuth = auth.onAuthStateChanged(
            async userAuth => {
              if(userAuth){
                const documentRef = firestore.doc(`pets/${this.state.petID}`);
      
                documentRef.onSnapshot(snapShot => {

                    console.log(snapShot.data())
                    this.setState({
                        petName: snapShot.data().petName,
                        mainOwner: snapShot.data().mainOwner,
                        age: snapShot.data().age,
                        sex: snapShot.data().sex,
                        species: snapShot.data().species,
                        weight: snapShot.data().weight,
                        neutered: snapShot.data().neutered
                    
                    });
                });
                
              }
              
            }
            
        );

        
    }

   
	render() {

        console.log(this.state)
        const {petID, petName, species, age, sex, weight, mainOwner, neutered} = this.state;
		return (
			<div className='sign-in'>
				<h2>Information for {petName} the {species}</h2>

                <p>ID: {petID}</p>

				<p>photo</p>

                <p>Age: {age}</p>
                <p>Sex: {sex}</p>
                <p>Weight: {weight}</p>
                <p>Neutered: {neutered === true ? "yes" : "no"}</p>
                <p>Main Owner: {mainOwner}</p>
                
                
			
			</div>
		);
	}
}

export default PetProfileHUD;

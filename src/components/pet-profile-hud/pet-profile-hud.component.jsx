import React, { Component } from 'react';
import { firestore } from '../../firebase/firebase.utils';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import './pet-profile-hud.styles.scss';
import OwnerList from '../owner-list/owner-list.component';

class PetProfileHUD extends Component {
	constructor(props) {
		super(props);

		this.state = {
            petID: '',
            petName: '',
            photoUrl: '',
            mainOwner: '',
            age: '',
            sex: '',
            species: '',
            weight: '',
            neutered: null,
            addOwner: false,
            export: false,
            shareLink: ''
		};
    }
    
    unsubscribeFromAuth = null;

    getID = async () => { 
        const id = window.location.pathname.substring(13,33);

        return id
    };

	componentDidMount(){
        
        this.getID().then((id) =>{
            this.setState({petID: id})
            const link = `https://my-pet-pal-94791.web.app/pets/new-pet/${this.state.petID}`
            this.setState({shareLink: link})
            const documentRef = firestore.doc(`pets/${this.state.petID}`);
      
            documentRef.onSnapshot(snapShot => {
    
                console.log(snapShot.data())
                this.setState({
                        
                              ...snapShot.data()
                    
                });
                console.log(this.state)
            });
        })
        
        const {currentUser} = this.props;
        

       
    }

   
	render() {

        console.log(this.state)
        const {petID, petName, photoUrl, species, age, sex, weight, mainOwner, neutered, shareLink} = this.state;

		return (
			<div className="HUD">
				<h2>Information for {petName} the {species}</h2>

                <img className="image" alt="petImage" src={`${photoUrl}`} />

                {/* <p>Pet ID: {petID}</p> */}
                <p>Age: {age}</p>
                <p>Sex: {sex}</p>
                <p>Weight: {weight}</p>
                <p>Neutered: {neutered}</p>
                <p>Main Owner: {mainOwner}</p>
                <br/>
                <br/>
                <h3>Add a friend as an Owner</h3>
                <p>Link: {shareLink}</p>

                <CopyToClipboard text={shareLink}>
                    <CustomButton>
                        Copy to clipboard
                    </CustomButton>
                </CopyToClipboard>
                
                <br/>
                <br/>
                
                <OwnerList id={petID} />
			
			</div>
		);
	}
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
  })

export default connect(mapStateToProps)(PetProfileHUD);

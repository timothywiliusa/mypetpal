import React, { Component } from 'react';
import 'react-phone-number-input/style.css'
import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, firestore, createUserProfileDocument, getUserDocumentReference } from '../../firebase/firebase.utils';
import './sign-up.styles.scss';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


class SignUp extends Component {
    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            address: 's',
            phoneNumber: '',
            user: null
        };     
    }
    unsubscribeFromAuth = null

    componentDidMount = async e =>{
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

    handleSubmit =  async e => {
        e.preventDefault();

        const { displayName, email, password, confirmPassword, firstName, lastName, address, phoneNumber} = this.state;

        if (password !== confirmPassword) {
            alert("passwords don't match")
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
                await createUserProfileDocument(user, {displayName, firstName, lastName, address, phoneNumber});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                nPets: null
            })
        } catch(error) {
            console.error(error);
        }
    };

    handleChange = e => {
        const { name, value } = e.target;
        console.log(this.state.phoneNumber);
        this.setState({[name]: value})
    }
    handleAddress(e){
        this.setState({address: e.label});
    }

    getName(){
        const{user} = this.state;
        if(user==null){
            console.log('hello');
            return 'nope';
        }
        var userRef = firestore.collection('users').doc(user.uid);
        userRef.get().then((doc)=>{
            if(doc.exists){
                console.log("document data: ", doc.data());
                this.setState({displayName: doc.data().displayName});
            } else{
                console.log("no can do");
            }
        }) 
    }
    
    render() {
        const {displayName, email, password, confirmPassword, firstName, lastName, address, phoneNumber} = this.state; 
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        handleChange={this.handleChange}
                        label='Display Name*'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        handleChange={this.handleChange}
                        label={'Email*'}
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        handleChange={this.handleChange}
                        label='Password*'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        label='Confirm Password*'
                        required
                    />
                    <FormInput
                        type='text'
                        name='firstName'
                        value={firstName}
                        handleChange={this.handleChange}
                        label='First Name*'
                        required
                    />
                    <FormInput
                        type='text'
                        name='lastName'
                        value={lastName}
                        handleChange={this.handleChange}
                        label='Last Name*'
                        required
                    />
                    <GooglePlacesAutocomplete
                        apiKey="AIzaSyAh78Q-N9Pj6FBwcHaFJp04ZTYCwKZvpVo"
                        name='address'
                        value={address}
                        selectProps={{
                            onChange: this.handleAddress.bind(this),
                        }}
                    />
                    <PhoneInput
                        country='us'
                        regions={['north-america']}
                        //type='text'
                        name='phoneNumber'
                        value={phoneNumber}
                        onChange={phoneNumber => this.setState({ phoneNumber})}
                        label='Phone Number'
                    />
                    <CustomButton type='submit'>
							CREATE ACCOUNT
					</CustomButton>
                </form>
            </div>
            
        )
    }
}

export default SignUp;
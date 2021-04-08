import React , { Component } from 'react'
import {connect } from 'react-redux'
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { storage } from '../../firebase/firebase.utils'

import './new-pet-form.styles.scss'

import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button.component';
import {createPetProfileDocument, createPetInUserProfileDocument} from '../../firebase/firebase.utils';



class NewPetForm extends Component {
    constructor(){
        super();

        this.state = {
            age: '',
            neutered: '',
            petName: '',
            photoUrl: '',
            sex: '',
            species: '',
            weight: '',
            redirect: false
        };     
    }

    handleSubmit =  async e => {
        e.preventDefault();

        console.log(this.state)

        const { currentUser } = this.props;

        const { photoUrl, petName, sex, age, weight, species, neutered } = this.state;

        try {
            // do firebase stuff
            const id = await createPetProfileDocument(currentUser, {age, neutered,petName, photoUrl, sex, species, weight });
            createPetInUserProfileDocument(currentUser,id,{petName, photoUrl})


            console.log(this.state)

            //empty fields
            this.setState({
                age: '',
                neutered: '',
                petName: '',
                photoUrl: '',
                sex: '',
                species: '',
                weight: '',
                redirect: true
            })

         

        } catch(error) {
            console.error(error);
        }
    };

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({[name]: value})
    }

    handlePhotoChange = async (e) => {
        if(e.target.files[0]){
            const file = e.target.files[0]
            const storageRef = storage.ref()
            const fileRef = storageRef.child(file.name)

            await fileRef.put(file).then(()=>{
                console.log("Uploaded file", file.name)
            })
            const url = await fileRef.getDownloadURL()
            this.setState({photoUrl: url})
            // this.setState({photo: e.target.files[0]})
        }
        
    }
    
    render() {
        
        const {petName ,species, sex, age, weight, neutered, redirect} = this.state;
        if (redirect) {
            return <Redirect to="/pets" />
        }
        return (
            <div className='new-pet'>
                <h2 className='title'>Create a new pet profile</h2>
             
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='petName'
                        value={petName}
                        handleChange={this.handleChange}
                        label='My name is,'
                        required
                    />
            
                    <FormInput
                        type='text'
                        name='species'
                        value={species}
                        handleChange={this.handleChange}
                        label='I am A'
                        required
                    />

                    <br />
                    <p>Uplaod Photo</p>
                    <input type="file" onChange={this.handlePhotoChange} />
                    
                    <br />
                   
                   <FormInput
                        type='text'
                        name='sex'
                        value={sex}
                        handleChange={this.handleChange}
                        label='M/F'
                        required
                    />

                    <FormInput
                        type='text'
                        name='age'
                        value={age}
                        handleChange={this.handleChange}
                        label='Age'
                        required
                    />

                    <FormInput
                        type='text'
                        name='weight'
                        value={weight}
                        handleChange={this.handleChange}
                        label='Weight'
                        required
                    />
                    <FormInput
                        type='text'
                        name='neutered'
                        value={neutered}
                        handleChange={this.handleChange}
                        label='neutered'
                        required
                    />

                 
                    <CustomButton type='submit'>CREATE</CustomButton>
                    
                   

                </form>
                    
            </div>
        )
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

export default connect(mapStateToProps)(NewPetForm);
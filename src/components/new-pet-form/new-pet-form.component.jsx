import React , { Component } from 'react'
import './new-pet-form.styles.scss'

import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button.component';


class NewPetForm extends Component {
    constructor(){
        super();

        this.state = {
            petName: '',
            sex: '',
            age: '',
            weight: '',
            species: '',
            neutered: ''
        };     
    }

    handleSubmit =  async e => {
        e.preventDefault();

        // const { displayName, email, password, confirmPassword } = this.state;

        // if (password !== confirmPassword) {
        //     alert("passwords don't match")
        //     return;
        // }

        try {
            // do firebase stuff

            // const { user } = await auth.createUserWithEmailAndPassword(email, password);
            // await createUserProfileDocument(user, {displayName});
            console.log(this.state)

            //empty fields
            this.setState({
                petName: '',
                species: ''
            })

        } catch(error) {
            console.error(error);
        }
    };

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({[name]: value})
    }
    
    render() {
        const {petName, species} = this.state;
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
                    <CustomButton type='submit'>CREATE</CustomButton>
                </form>
                    
            </div>
        )
    }
}

export default NewPetForm;
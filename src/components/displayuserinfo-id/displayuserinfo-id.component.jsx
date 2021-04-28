import React, {Component} from 'react';
import { firestore} from '../../firebase/firebase.utils';
import Button from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input-component';
import './displayuserinfo-id.scss';

class Userinfobyid extends Component{
    
    constructor(){
        super()
        this.state = {
            inputValue: '',
            email:'',
            firstname:'',
            phone:'',
            address:'',
            currentUser: null
        };
    }

    unsubscribeFromAuth = null

    
    // componentDidMount() {
    //     const {id} = this.props.match.params.id
    //     var query = firestore.collection('users').doc(this.props.match.params.id).get();
    //     query.then((doc)=>{
    //         if(doc.exists){
    //             this.setState({displayName: doc.data().displayName});
    //             this.setState({email: doc.data().email});
    //             this.setState({firstname: doc.data().firstName});
    //             this.setState({phone: doc.data().phoneNumber});
    //             this.setState({address: doc.data().address});
    //             console.log(this.state)
    //     } 
    //     })
    // }
    
    handleGetinputValue =  (event) =>{
        this.setState({
            inputValue : event.target.value,
        })
    };
    
    handlePost = () =>{
        const {inputValue} = this.state;
        console.log (inputValue, "-----userid");
        var userRef = firestore.collection('users');
        if(this.state.inputValue !== ''){
            let query = userRef.where("email", "==", this.state.inputValue).get();
            query.then((querySnapshot) =>{
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, "=", doc.data());
                    this.setState({
                        displayName: doc.data().displayName,
                        firstname: doc.data().firstName,
                        phone: doc.data().phoneNumber,
                        address: doc.data().address
                    })
                })
            });
        }
    };




    render(){
        return(
            <div>
                <h2> Profile </h2>
                    <p>Email: {this.state.inputValue}</p> 
                    <p>First Name: {this.state.firstname} </p>
                    <p>Display Name: {this.state.displayName} </p>
                    <p>Address: {this.state.address} </p>
                    <p>Phone Number: {this.state.phone} </p>
                <div className = 'EnterInfo'>
                    <div className = 'UserId'>
                        <h3>Enter User Email to View the User Information</h3>
                        <FormInput
                            value = {this.state.inputValue}
                            onChange = {this.handleGetinputValue}
                            label='email'
                        />
                    </div>
                    <div className = 'buttons'>
                        <Button onClick = {this.handlePost}> submit </Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Userinfobyid;

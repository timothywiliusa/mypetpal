import React, {Component} from 'react';
import FormInput from '../form-input/form-input-component';
import { auth, firestore} from '../../firebase/firebase.utils';



class Userinfobyid extends Component{
    
    constructor(){
        super()
        this.state = {
            inputValue: '',
            user: null
        };
    }

    unsubscribeFromAuth = null

    componentDidMount() {
        var query = firestore.collection('users').doc('{this.state}').get();
        query.then((doc)=>{
            if(doc.exists){
                this.setState({displayName: doc.data().displayName});
                this.setState({email: doc.data().email});
                this.setState({firstname: doc.data().firstName});
                this.setState({phone: doc.data().phoneNumber});
                this.setState({address: doc.data().address});
        } 
        })
    }
    
    handleGetinputValue =  (event) =>{
        this.setState({
            inputValue : event.target.value,
        })
    };
    
    handlePost = () =>{
        const {inputValue} = this.state;
        console.log (inputValue, "-----userid")
    }




    render(){
        return(
            <div>
                <input
                    value = {this.state.inputValue}
                    onChange = {this.handleGetinputValue}
                />
                <button onClick = {this.handlePost}> submit </button>
                <h2 className = "text center mb-4"> Profile </h2>
                    <p>Email: {this.state.email}</p>
                    <p>User-Id: {this.state} </p>
                    <p>First Name: {this.state.firstname} </p>
                    <p>Display Name: {this.state.displayName} </p>
                    <p>Address: {this.state.address} </p>
                    <p>Phone Number: {this.state.phone} </p>
            </div>
        )
    }
}
export default Userinfobyid;

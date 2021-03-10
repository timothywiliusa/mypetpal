import React, {Component} from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, GoogleMapReact } from "google-maps-react";
import { Button, Form, FormLabel } from 'react-bootstrap';
import FormInput from '../form-input/form-input-component';

const style = {
    position: "static",
    maxWidth: "700px",
    height: "650px",
    overflowX: "hidden",
    overflowY: "hidden",
    margin: "5px 0"
   };

const formstyle = {
    position: "relative",
    maxWidth: "500px",
    left: "720px"
};
  
class Shop extends Component{

    constructor(){
        super();
        this.state = {
            zipcode: ''
        };
    }

    handleChange =  (event) =>{
        this.setState({
            zipcode: event.target.value,
        })
    };

    handlePost = () =>{
        const {zipcode} = this.state;
        console.log (zipcode, "-----zipcode");

    };

  
    render(){
        return(
            <div className="APP">
                <header className="App-header">
                    <h1 className="App-title"> Pet Stores</h1>
                </header>
                <Map google={this.props.google} style={style} zoom= {14}>
                    <Marker onClick={this.handleChange}
                        name={'Current location'}
                        // draggable={true}
                        // onDragEnd={ this.onMarkerDragEnd }                    
                    />
                </Map>
                <div className="Form" style={formstyle}>
                    <Form>
                        <FormLabel> Zipcode: </FormLabel>
                        <input
                            zipcode = {this.state.zipcode}
                            onChange = {this.handleChange}
                        />
                    </Form>
                    <Button type ='submit' onClick = {this.handlePost}> submit </Button>
                </div>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDSi_YqdZ8R7Z9NMgphl-5xx9SQ-ejQsKE")
})(Shop)
import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, GoogleMapReact } from "google-maps-react";
import { Button, Form, FormLabel } from 'react-bootstrap';
import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button.component';

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

class Shop extends Component {

    constructor() {
        super();
        this.state = {
            address: '',
            target: {
                lng: 116.400819,
                lat: 39.916263,
            },
            result: [],
            currentBind: {
                geometry: {
                    location: {
                        lng: 0,
                        lat: 0,
                    }
                }
            }

        };
    }

    handleChange = (event) => {
        this.setState({
            address: event.target.value
        })
    };

    handlePost = () => {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(this.state.address) + "&key=AIzaSyDtB_XWWRYs30fkqI-fIofSUzJIg84TeRw", {
            method: "GET",
            })
            .then((res) => {
                return res.json() //success
            })
            .then((result) => {

                if(result.results[0].geometry.location.lat != " " && result.results[0].geometry.location.lng                !=" ")
                {        
                    console.log(result)

                    const lat = result.results[0].geometry.location.lat
                    const lng = result.results[0].geometry.location.lng



                    fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + ',' + lng + "&radius=15000&type=Stores&keyword=pet&key=AIzaSyDtB_XWWRYs30fkqI-fIofSUzJIg84TeRw", {
                        method: "GET",
                    })
                        .then((res) => {
                            return res.json() //success
                        })
                        .then((result) => {
            
                            for (let i in result.results) {
                                result.results[i].key = i
                                }
                            this.setState({
                                result: result.results,
                                target: {
                                    lat: lat,
                                    lng: lng
                                }
                            })
                        });
                }else{
                    console.log('Wrong Input');
                    this.setState({
                    address: ''
                    })
                }
            })
    };
        /* const zipcode = this.state.zipcode
         const location = zipcode.split(',')
         const lat = parseFloat(location[0])
         const lng = parseFloat(location[1])
 
 
 
         fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +lat + ',' + lng + "&radius=15000&type=Stores&keyword=pet&key=AIzaSyDtB_XWWRYs30fkqI-fIofSUzJIg84TeRw", {
             method: "GET",
         })
             .then((res) => {
                 return res.json() //
             })
             .then((result) => {
                 for (let i in result.results) {
                     result.results[i].key = i
                 }
                 this.setState({
                     result: result.results,
                     target: {
                         lat: lat,
                         lng: lng
                     }
                 })
             }); */

    onMarkerClick(props, marker, e) {
        this.setState({
            currentBind: this.state.result[props.id]
        })
    }
    render() {
        return (
            <div className="APP">

                <header className="App-header">
                    <h1 className="App-title"> Pet Stores</h1>
                </header>
                <Map google={this.props.google} style={style} zoom={14}
                    center={this.state.target} initialCenter={this.state.target}
                >
                    {
                        this.state.result.map((item, index) => {
                            return <Marker
                                onClick={this.onMarkerClick.bind(this)}
                                title={item.name}
                                id={index}
                                position={item.geometry.location}
                                draggable={true}
                                key={index}
                            />
                        })
                    }

                    <InfoWindow visible={true} position={this.state.currentBind.geometry.location}>
                        <div>
                            <h1>{this.state.currentBind.name}</h1>

                            <h3>{this.state.currentBind.vicinity}</h3>
                        </div>
                    </InfoWindow>
                </Map>
                <div className="Form" style={formstyle}>
                    <Form>
                        <FormLabel> Address: </FormLabel>
                        <FormInput
                            zipcode={this.state.zipcode}
                            onChange={this.handleChange}
                        />
                    </Form>
                    <CustomButton onClick={this.handlePost}> submit </CustomButton>
                </div>
            </div >
        );
    }
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDtB_XWWRYs30fkqI-fIofSUzJIg84TeRw")
})(Shop)


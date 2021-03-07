import React from "react"
import { Card } from "react-bootstrap"
import firebase from 'firebase/app';
import './userprofile.styles.scss';

export default function UserProfile(){
  let user = firebase.auth().currentUser;
  return(
  <>
    <Card>
        <Card.Body>
            <h2 className = "text center mb-4"> Profile </h2>
            <p>Email:{user.email}</p>
            <p>User-Id:{user.uid}</p>
            <p>First Name:</p>
            <p>Display Name:</p>
        </Card.Body>
    </Card>
  </>
  )
}
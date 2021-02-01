import React, { useRef } from 'react';
import {Form, Button, Card} from 'react-bootstrap'

export default function userProfile(){
  const emailRef = useRef()
  const nameRef = useRef()
  const genderRef = useRef()
  const ageRef = useRef()
  
  return(
    <Card>
      <Card.Body>
        <h2 classNmae = "text-center mb-4"> User Profile</h2>
        <Form>
          <From.Group id = "name">
            <Form.Label>Username</From.Label>
            <Form.Control type = "name" ref={nameRef} required />
            </Form.Group>
          <From.Group id = "gender">
            <Form.Label>Gender</From.Label>
            <Form.Control type = "gender" ref={genderRef} required />
            </Form.Group>
          <From.Group id = "age">
            <Form.Label>Age</From.Label>
            <Form.Control type = "age" ref={ageRef} required />
            </Form.Group>
          <From.Group id = "email">
              <Form.Label>email</From.Label>
              <Form.Control type = "email" ref={emailRef} required />
            </Form.Group>
          </Form>
          <Button classname = "w-100" type = "subimit" >
            creatuserprofile
          </Button>
      </Card.Body>
    </Card>
    <div classNmae = "w-100 text-center mt-2">
      create a prifle !
    </div>
  )
}

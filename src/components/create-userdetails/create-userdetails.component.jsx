import React, {useRef} from 'react';
import {Form, Card, Button} from 'react-bootstrap';

export default function UserProfile(){
  const emailRef = useRef()
  const nameRef = useRef()
  const genderRef = useRef()
  const ageRef = useRef()


    return(
      <Card>
        <Card.Body>
          <h2 classNmae = "text-center mb-4"> User Profile</h2>
          <Form>
            <Form.Group id = "name">
              <Form.Label>Username</Form.Label>
              <Form.Control type = "name" ref={nameRef} required />
              </Form.Group>
              
            <Form.Group id = "gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control type = "gender" ref={genderRef} required />
              </Form.Group>
            <Form.Group id = "age">
              <Form.Label>Age</Form.Label>
              <Form.Control type = "age" ref={ageRef} required />
              </Form.Group>
            <Form.Group id = "email">
                <Form.Label>email</Form.Label>
                <Form.Control type = "email" ref={emailRef} required />
              </Form.Group>
            </Form>
            <Button classname = "w-100" type = "subimit" >
              creatuserprofile
            </Button>
        </Card.Body>
        <div classNmae = "w-100 text-center mt-2">
          create a prifle !
        </div>
      </Card>
    )
}

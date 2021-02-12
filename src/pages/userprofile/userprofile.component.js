import userEvent from "@testing-library/user-event"
import React, { useState } from "react"
import { Card } from "react-bootstrap"
import { useAuth } from "../../firebase/AuthContext"


export default function Userprofile(){
  const { currentUser } = useAuth()
  return(
    <>
    <Card>
        <Card.Body>
            <h2 className = "text center mb-4"> Profile </h2>
            <strong>Email:</strong> {user.email}
        </Card.Body>
    </Card>
    </>
)
}
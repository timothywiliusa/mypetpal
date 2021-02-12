import React, { useContext, useState, useEffect } from "react";
import { auth } from './firebase.utils';

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProivder({ children }) {
    const [currentUser, setCurrentUser] = useState()

    function updateEmail(email) {
        return currentUser.updateEmail(email)
      }
    
      function updatePassword(password) {
        return currentUser.updatePassword(password)
      }
    
    auth.onAuthStateChanged(user =>{
        setCurrentUser(user)
    })
    
    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
}
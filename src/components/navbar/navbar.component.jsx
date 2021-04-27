import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

import { auth } from '../../firebase/firebase.utils'
import { ReactComponent as Logo } from '../../assets/paw-black-shape.svg';

import { setCurrentUser } from '../../redux/user/user.actions'

import './navbar.styles.scss';


class Navbar extends Component {

    render(){

        const {setCurrentUser} = this.props
        const logout = () => {
            setCurrentUser(null)
        }

        return (
            <div className="navbar">
                <div className="logo-container">
                    <Link to="/">
                        <Logo className="logo" /> 
                    </Link>
                </div>
                

                <div className="options">
                    <Link className="option" to="/support">
                        HELP
                    </Link>
                    <Link className="option" to="/contact">
                        CONTACT
                    </Link>
                    <Link className="option" to="/userprofile">
                        USERPROFILE
                    </Link>
                    <Link className="option" to ="/userinfobyid">
                        View Userinfo by Id
                    </Link>
                    {
                        this.props.currentUser ?
                            
                            <div className='option' onClick={() => {
                                auth.signOut()
                                logout()

                            }}>
                                <Link to="/login">
                                SIGN OUT
                                </Link>
                            </div>
                            :
                            <Link className="option" to="/login">
                                SIGN IN
                            </Link>
                    }
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
  })
  

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

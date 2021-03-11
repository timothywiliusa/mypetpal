import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import Navbar from './components/navbar/navbar.component';
import Login from './pages/login/login.component';
import Signup from './pages/signup/signup.component';
import Contact from './pages/contact/contact-us.component';
import Support from './pages/support/support.component';
import Pets from './pages/pets/pets.component';
import Friends from './pages/friends/friends.component';
import Vets from './pages/vets/vets.component';
import Dashboard from './pages/dashboard/dashboard.component';
import Shop from './pages/shop/shop.component';

import NewPet from './pages/new-pet/new-pet.component'
import PetProfile from './pages/pet-profile/pet-profile.component'

import UserProfile from './pages/userprofile/userprofile.component'

import Userinfobyid from './pages/userinfobyid/userinfobyid.component'
import { auth, getUserDocumentReference } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'


class App extends Component {
 
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props

    //user authentication
    this.unsubscribeFromAuth = auth.onAuthStateChanged(
      async userAuth => {
        if(userAuth){

          setCurrentUser(userAuth);


          // const userRef = getUserDocumentReference(userAuth);

          // userRef.onSnapshot(snapShot => {
          //   console.log(snapShot)
          //   setCurrentUser({
          //       id: snapShot.id,
          //       ...snapShot.data()
          //   });
          // });
        }
      }
    );
  }
  
  render(){
    return (
      <div>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" render={() => 
            this.props.currentUser ? ( 
              <Redirect to='/' />
            ) : (
              <Login />
            )
            }  
          />
          {/* <Route exact path="/signup" render={(props)=> <Signup currentUser={this.state.currentUser}/>} /> */}
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/support" component={Support} />
          <Route exact path="/pets" component={Pets} />
          <Route exact path="/friends/:id?/:uid1?/:uid2?" render={(props)=><Friends currentUser={this.props.currentUser}/>} />
          <Route exact path="/vets" component={Vets} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/userprofile" component={UserProfile}/>
          <Route path="/pets/new-pet" component={NewPet} />
          <Route path="/pet-profile" component={PetProfile} />
          <Route excat path="/userinfobyid" component={Userinfobyid}/> {/*render = {({props, match}) => (<Userinfobyid userId = {this.state.id} match = {match} />)}  />  */}
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);

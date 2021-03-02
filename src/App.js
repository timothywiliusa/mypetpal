import React, { Component } from 'react'
import './App.css';

import { Switch, Route } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
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


class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    //user authentication
    this.unsubscribeFromAuth = auth.onAuthStateChanged(
      async userAuth => {
        if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            },
            () => {
              //logging current user from a snapshot of the database
              console.log(this.state);
            });
          });
        }

        this.setState({ currentUser: userAuth });
      }
    );
  }
  
  

  render(){
    return (
      <div>
        <Navbar currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" render={(props)=> <Signup currentUser={this.state.currentUser}/>} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/support" component={Support} />
          <Route exact path="/pets" component={Pets} />
          <Route exact path="/friends/:id?/:uid1?/:uid2?" render={(props)=><Friends currentUser={this.state.currentUser}/>} />
          <Route exact path="/vets" component={Vets} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/pets/new-pet" component={NewPet} />
        </Switch>
      </div>
    );
  }
}

export default App;

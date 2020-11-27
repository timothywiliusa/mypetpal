import React, { Component } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import Navbar from './components/navbar/navbar.component';
import Login from './pages/login/login.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
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
        </Switch>
      </div>
    );
  }
  
}

export default App;

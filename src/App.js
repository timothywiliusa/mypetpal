import React, { Component } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import Navbar from './components/navbar/navbar.component';
import Login from './pages/login/login.component';
import { auth } from './firebase/firebase.utils';


class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(
      user => {
        this.setState({currentUser: user});

        console.log(user);
      }
    )
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

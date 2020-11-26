import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component'
import Navbar from './components/navbar/navbar.component'

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
				<Route exact path="/" component={HomePage} />
			</Switch>
    </div>
  );
}

export default App;

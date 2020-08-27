import React, { Fragment, Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';


// Layout Components
import Navbar from './components/layout/Navbar';
import BottomMenu from './components/layout/BottomMenu';

// Routing Components
import ActivitySelection from './components/pages/ActivitySelection';

class App extends Component {
	render() {
  		return (
        <Router>
    		<Fragment>
        		<Navbar />
        		<Switch>
        			<Route exact path='/'>
                    	<ActivitySelection />
                    </Route>
        		</Switch>
        		<BottomMenu />
    		</Fragment>
        </Router>
  		);
	}
}

export default App;
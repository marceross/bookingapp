import React, { Fragment, Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import BottomMenu from './components/layout/BottomMenu';

// Routing Components
import ActivitySelection from './components/pages/ActivitySelection';
import RockCycling from './components/pages/RockCycling';

class App extends Component {
  	constructor(props) {
    	super(props)
    	this.state = {
        }
    }

  	liftStateUp = data => {
    	this.setState({ transparent: data })
  	}
    
	render() {
    	let navbarBackgroundColor = this.state.transparent ? "transparent" : "white";
    	let navbarClassNames = "col-12 navbar " + navbarBackgroundColor;
    
  		return (
        <Router>
    		<Fragment>
        		<Navbar navbarClassNames={navbarClassNames}/>
        		<Switch>
        			<Route exact path='/'>
                    	<ActivitySelection liftStateUp={this.liftStateUp} />
                    </Route>        			
        			<Route path='/rock-cycling'>
                    	<RockCycling liftStateUp={this.liftStateUp} />
                    </Route>
        		</Switch>
        		<BottomMenu />
    		</Fragment>
        </Router>
  		);
	}
}

export default App;
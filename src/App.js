import React, { Fragment, Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import BottomMenu from './components/layout/BottomMenu';

// Routing Components
import ActivitySelection from './components/pages/ActivitySelection';
import RockCycling from './components/pages/RockCycling';
import Horarios from './components/pages/Horarios';
import Edit from './components/pages/Edit';
import Configuracion from './components/pages/Configuracion';
import MemberEditar from './components/pages/MemberEditar';

class App extends Component {
  	constructor(props) {
    	super(props);
    	this.state = {
        	mode: 'member-mode'
        }
    }

  	liftStateUp = data => {
    	this.setState({ transparent: data })
  	}
    
    changeMode = () => {
        (this.state.mode === 'member-mode') ? this.setState({mode: 'owner-mode'}) : this.setState({mode: 'member-mode'});
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
        			<Route path='/horarios'>
                    	<Horarios liftStateUp={this.liftStateUp} mode={this.state.mode} />
                    </Route>     
					{/* In the future, this Edit route will be added with the :id in the path*/}
					<Route path='/edit'>
                    	<Edit />
                    </Route>
        			<Route path='/configuracion'>
                    	<Configuracion liftStateUp={this.liftStateUp} changeMode={this.changeMode} mode={this.state.mode}/>
                    </Route>
        			<Route path='/member-editar'>
                    	<MemberEditar />
                    </Route>
        		</Switch>
        		<BottomMenu mode={this.state.mode}/>
    		</Fragment>
        </Router>
  		);
	}
}

export default App;
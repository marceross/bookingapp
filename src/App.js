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
import Editar from './components/pages/Editar';

class App extends Component {
   	state = {
        mode: 'member-mode'
    }

  	liftStateUp = data => {
    	this.setState({ transparent: data });
  	}
    
    changeMode = () => {
        (this.state.mode === 'member-mode') ? ( 
        	this.setState({mode: 'owner-mode'}) 
        ) : (
        	this.setState({mode: 'member-mode'})
        );
    }
    
	render() {
    	let navbarBackgroundColor = this.state.transparent ? "transparent" : "white";
    	let navbarClassNames = "col-12 navbar " + navbarBackgroundColor;
    
    	/* Defining Props */
    	const liftStateUp = this.liftStateUp;
    	const changeMode = this.changeMode;
    	const mode = this.state.mode;
    
  		return (
        <Router>
    		<Fragment>
        		<Navbar navbarClassNames={navbarClassNames}/>
        		<Switch>
        			<Route exact path='/'>
                    	<ActivitySelection liftStateUp={liftStateUp} />
                    </Route>        			
        			<Route path='/rock-cycling'>
                    	<RockCycling liftStateUp={liftStateUp} />
                    </Route>        			
        			<Route path='/horarios'>
                    	<Horarios liftStateUp={liftStateUp} mode={mode} />
                    </Route>     
					{/* In the future, this Edit route will be added with the :id in the path*/}
					<Route path='/edit'>
                    	<Edit />
                    </Route>
        			<Route path='/configuracion'>
                    	<Configuracion liftStateUp={liftStateUp} changeMode={changeMode} mode={mode}/>
                    </Route>
        			<Route path='/editar'>
                    	<Editar mode={mode}/>
                    </Route>
        		</Switch>
        		<BottomMenu mode={mode}/>
    		</Fragment>
        </Router>
  		);
	}
}

export default App;
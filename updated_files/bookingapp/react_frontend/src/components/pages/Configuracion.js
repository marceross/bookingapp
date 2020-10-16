import React, { Fragment, Component } from 'react';
import {Route} from 'react-router-dom';

// Layout Components
import UserProfile from '../layout/UserProfile';

class Configuracion extends Component {
	componentDidMount() {
    	const setTransparentToFalse = this.props.setTransparentToFalse;
    	setTransparentToFalse();
    }

	render() {
    	const {changeMode, mode} = this.props;
  		return (
			<Fragment>
				{/* Position: sticky couldn't work here, so I had to make the navbar class as fixed.
  				* I inserted this div with a height of 66px here for the time being */}
				<div style={{height: '66px'}}></div>
				<UserProfile changeMode={changeMode} mode={mode}/>
				{/* Filler for the fixed-positioned bottom-menu */}
        		<div className="col-12" style={{ height: '83.6px' }}></div>
        	</Fragment>
        );
    }
}

export default Configuracion;
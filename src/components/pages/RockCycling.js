import React, { Fragment, Component } from 'react';

/* Import components */
import RockCyclingSchedules from '../layout/RockCyclingSchedules';
import Modal from '../layout/Modal';

class RockCycling extends Component {
  	constructor(props) {
    	super(props);
    	this.setTransparency = this.setTransparency.bind(this);
  	}

 	componentDidMount() {
    	window.addEventListener('load', this.setTransparency);
        var evt = document.createEvent('Event');  
        evt.initEvent('load', false, false);  
        window.dispatchEvent(evt);
 	}

  	setTransparency() {
		let booleanValue = true;	
    	this.setState({ transparent: booleanValue });
    	this.props.liftStateUp(booleanValue);
  	}

	render() {
  		return (
    		<Fragment>
        		<div className="top-background">
        		</div>
        		<RockCyclingSchedules />
        		<Modal />
    		</Fragment>
  		);
	}
}

export default RockCycling;
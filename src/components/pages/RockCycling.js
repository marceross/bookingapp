import React, { Fragment, Component } from 'react';

/* Import components */
import RockCyclingSchedules from '../layout/RockCyclingSchedules';
import Modal from '../layout/Modal';

class RockCycling extends Component {
	componentDidMount() {
    	const setTransparentToTrue = this.props.setTransparentToTrue;
    	setTransparentToTrue();
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
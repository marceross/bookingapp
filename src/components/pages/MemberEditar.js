import React, { Fragment, Component } from 'react';

// Import components
import MemberDetailsForm from '../layout/MemberDetailsForm';

class MemberEditar extends Component {
	render() {
    	return (
        <Fragment>
        	{/* Position: sticky couldn't work here, so I had to make the navbar class as fixed.
  			* I inserted this div with a height of 66px here for the time being */}
			<div style={{height: '66px'}}></div>
			<MemberDetailsForm />
			<div className="col-12" style={{height: '83.6px'}}></div>
		</Fragment>
        );
    }
}

export default MemberEditar;
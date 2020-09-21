import React, { Fragment, Component } from 'react';

// Layout Components
import MemberDetailsForm from '../layout/MemberDetailsForm';
import OwnerDetailsForm from '../layout/OwnerDetailsForm';

class Editar extends Component {
	render() {
  		return (
			<Fragment>
				{/* Position: sticky couldn't work here, so I had to make the navbar class as fixed.
  				* I inserted this div with a height of 66px here for the time being */}
				<div style={{height: '66px'}}></div>
				{(this.props.mode === 'member-mode') ? <MemberDetailsForm /> : <OwnerDetailsForm />}
				{/* Filler for the fixed-positioned bottom-menu */}
        		<div className="col-12" style={{ height: '83.6px' }}></div>
        	</Fragment>
        );
    }
}

export default Editar;
import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

/* Import images */

class BottomMenu extends Component {
  	constructor(props) {
    	super(props);
    }

    render() {
        return (
        <Fragment>
            <div className="col-12 row bottom-menu">
        		<div className="col-3">
        			<Link to='/'>
        				<div className="center-col-12">
							{(this.props.mode === 'member-mode') ? <i className="fas fa-bicycle orange" /> : <i className="fas fa-bicycle blue" />}
        				</div>
						{(this.props.mode === 'member-mode') ? <p className="orange-text">Actividades</p> : <p className="blue-text">Actividades</p> }
        			</Link>
        		</div>
        		<div className="col-3">
        			<Link to="/horarios">
        				<div className="center-col-12">
        					{(this.props.mode === 'member-mode') ? <i className="fas fa-clock orange" /> : <i className="fas fa-clock blue" />}
        				</div>
						{(this.props.mode === 'member-mode') ? <p className="orange-text">Horarios</p> : <p className="blue-text">Horarios</p> }
        			</Link>
        		</div>
        		<div className="col-3">
        			<div className="center-col-12">
        				{(this.props.mode === 'member-mode') ? <i className="fas fa-envelope orange" /> : <i className="fas fa-envelope blue" />}
        			</div>
						{(this.props.mode === 'member-mode') ? <p className="orange-text">Mesanjes</p> : <p className="blue-text">Mesanjes</p> }
        		</div>
        		<div className="col-3">
        			<Link to="/configuracion">
        				<div className="center-col-12">
        					{(this.props.mode === 'member-mode') ? <i className="fa fa-gear orange" /> : <i className="fa fa-gear blue" />}
        				</div>
						{(this.props.mode === 'member-mode') ? <p className="orange-text">Configuracion</p> : <p className="blue-text">Configuracion</p> }
        			</Link>
        		</div>
            </div>
		</Fragment>
        );
    }
}

export default BottomMenu;
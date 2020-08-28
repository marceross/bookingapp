import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

/* Import images */

class BottomMenu extends Component {
    render() {
        return (
        <Fragment>
            <div className="col-12 row bottom-menu">
        		<div className="col-3">
        			<Link to='/'>
        				<div className="center-col-12">
        					<i className="fas fa-bicycle" />
        				</div>
        				<p>Actividades</p>
        			</Link>
        		</div>
        		<div className="col-3">
        			<Link to="/horarios">
        				<div className="center-col-12">
        					<i className="fas fa-clock" />
        				</div>
        				<p>Horarios</p>
        			</Link>
        		</div>
        		<div className="col-3">
        			<div className="center-col-12">
        				<i className="fas fa-envelope" />
        			</div>
        			<p>Mensajes</p>
        		</div>
        		<div className="col-3">
        			<Link to="/configuracion">
        				<div className="center-col-12">
        					<i className="fa fa-gear" />
        				</div>
        				<p>Configuracion</p>
        			</Link>
        		</div>
            </div>
		</Fragment>
        );
    }
}

export default BottomMenu;
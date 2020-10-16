import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

/* Import images */

class BottomMenu extends Component {
    render() {
    	const setTransparentToFalse = this.props.setTransparentToFalse;
    	const mode = this.props.mode;
        return (
        <Fragment>
            <div className="col-12 row bottom-menu">
        		<div className="col-3">
        			<Link to='/' onClick={setTransparentToFalse}>
        				<div className="center-col-12">
							{(mode === 'member-mode') ? <i className="fas fa-bicycle orange" /> : <i className="fas fa-bicycle blue" />}
        				</div>
						{(mode === 'member-mode') ? <p className="orange-text">Actividades</p> : <p className="blue-text">Actividades</p> }
        			</Link>
        		</div>
        		<div className="col-3">
        			<Link to="/horarios" onClick={setTransparentToFalse}>
        				<div className="center-col-12">
        					{(mode === 'member-mode') ? <i className="fas fa-clock orange" /> : <i className="fas fa-clock blue" />}
        				</div>
						{(mode === 'member-mode') ? <p className="orange-text">Horarios</p> : <p className="blue-text">Horarios</p> }
        			</Link>
        		</div>
        		<div className="col-3">
        			<div className="center-col-12">
        				{(mode === 'member-mode') ? <i className="fas fa-envelope orange" /> : <i className="fas fa-envelope blue" />}
        			</div>
						{(mode === 'member-mode') ? <p className="orange-text">Mesanjes</p> : <p className="blue-text">Mesanjes</p> }
        		</div>
        		<div className="col-3">
        			<Link to="/configuracion" onClick={setTransparentToFalse}>
        				<div className="center-col-12">
        					{(mode === 'member-mode') ? <i className="fa fa-gear orange" /> : <i className="fa fa-gear blue" />}
        				</div>
						{(mode === 'member-mode') ? <p className="orange-text">Configuracion</p> : <p className="blue-text">Configuracion</p> }
        			</Link>
        		</div>
            </div>
		</Fragment>
        );
    }
}

export default BottomMenu;
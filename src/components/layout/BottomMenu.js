import React, {Component} from 'react';

/* Import images */

class BottomMenu extends Component {
    render() {
        return (
            <div className="col-12 row bottom-menu">
        		<div className="col-3">
        			<div className="center-col-12">
        				<i className="fas fa-bicycle" />
        			</div>
        			<p>Actividades</p>
        		</div>
        		<div className="col-3">
        			<div className="center-col-12">
        				<i className="fas fa-clock" />
        			</div>
        			<p>Horarios</p>
        		</div>
        		<div className="col-3">
        			<div className="center-col-12">
        				<i className="fas fa-envelope" />
        			</div>
        			<p>Mensajes</p>
        		</div>
        		<div className="col-3">
        			<div className="center-col-12">
        				<i className="fa fa-gear" />
        			</div>
        			<p>Configuracion</p>
        		</div>
            </div>
        );
    }
}

export default BottomMenu;
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

/* Import logo image */

class Modal extends Component {
	componentDidMount() {
    	const script = document.createElement("script");

    	script.src = "./scripts/scripts.js";
    	script.async = true;

    	document.body.appendChild(script);    
    }

	render() {
    return (
		<div id="myModal" className="modal">
 	 		<div className="modal-content">
    			<span className="close" id="close-button">&times;</span>
    			<h1 className="text-center">Clase Confirmada</h1>
    			<br/>
    			<p className="text-center">Rock cycling</p>
    			<p className="text-center">15 de Octubre 11 horas</p>
				<div className="center-col-12">
					<button id="reservar">Invitar</button>
				</div>
  			</div>
		</div>  
    );
    }
}

export default Modal;
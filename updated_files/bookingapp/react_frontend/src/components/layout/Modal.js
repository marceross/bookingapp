import React, {Component} from 'react';

/* Import logo image */

class Modal extends Component {
	
	constructor(props){
		super(props);

		this.toggle = this.props.toggle_modal;
		this.reserve = this.props.reserve;
		this.schedule = this.props.schedule;

	}
	
	componentDidMount() {  
	}
	
	render() {
		return (
			<div id="myModal" className="modal">
				<div className="modal-content"> 
					<span className="close" id="close-button" onClick={ event => this.toggle(false) }>&times;</span>
					<h1 className="text-center">Clase Confirmada</h1>
					<br/>
					<p className="text-center">Date: { this.schedule.date }</p>
					<p className="text-center">Time : { this.schedule.time }</p>
					<p className="text-center">${ this.schedule.fee }</p>
					<div className="center-col-12">
						<button id="reservar" onClick={ event => this.reserve() }>Confirm</button>
					</div>
				</div>
			</div>  
		);
    }
}

export default Modal;
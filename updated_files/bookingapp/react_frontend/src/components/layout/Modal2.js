import React, {Component} from 'react';


class Modal2 extends Component {
	
	constructor(props){
		super(props);

		this.toggle = this.props.toggle_modal;
		this.delete_reservation = this.props.delete_reservation;
		this.schedule = this.props.schedule;
		this.index = this.props.index;

	}
	
	componentDidMount() {  
	}
	
	render() {
		return (
			<div id="myModal" className="modal">
				<div className="modal-content"> 
					<span className="close" id="close-button" onClick={ event => this.toggle(false) }>&times;</span>
					<h1 className="text-center">Confirm the Delete Reservation</h1>
					<br/>
					<p className="text-center">{ this.schedule.name }</p>
					<p className="text-center">Date: { this.schedule.date }</p>
					<p className="text-center">Time : { this.schedule.time }</p>
					<p className="text-center">${ this.schedule.fee }</p>
					<div className="center-col-12">
						<button id="reservar" onClick={ event => this.delete_reservation(this.schedule, this.index) }>Confirm</button>
					</div>
				</div>
			</div>  
		);
    }
}

export default Modal2;
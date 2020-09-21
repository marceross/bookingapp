import React, { Fragment, Component } from 'react';

// Import images
class OwnerEditSchedule extends Component {
	render() {
    	return (
        <Fragment>
			<div className="container">
        	<div className="col-12 row">
        		<h1 className="text-center">Actividad</h1>
        	</div>
        	<div className="col-12 top-image">
        
        	</div>
        	<div className="col-12 row">
        		<form className="editar-form">
            		<div className="col-12">
            			<div className="col-6 edit-schedule">
        					<i className="fas fa-calendar-alt"></i>
							<input type="date" />
						</div>
        				<div className="col-6 edit-schedule" style={{ paddingLeft: '15pt' }}>
        					<i className="fas fa-clock"></i>
							<input type="text" />
        				</div>
					</div>
            		<div className="col-12 row">
            			<div className="col-4 edit-schedule" style={{position: 'relative', right: '8px'}}>
        					<i className="fas fa-money-bill-wave"></i>
							<input type="number" />
						</div>
            			<div className="col-4 edit-schedule" style={{ paddingLeft: '15pt' }}>
        					<i className="fa fa-user"></i>
							<input type="number" />
						</div>
            			<div className="col-4 edit-schedule" style={{ paddingLeft: '15pt' }}>
        					<i className="fa fa-scissors"></i>
							<input type="number" />
						</div>
					</div>
            		<div className="col-12">
            			<div className="col-8 edit-schedule">
        					<i className="fa fa-file" style={{position: 'relative', bottom: '26px'}}></i>
							<textarea placeholder="Description"></textarea>
						</div>
					</div>
					<div className="center-col-12">
						<button type="submit" className="blue" id="reservar">Confirmar</button>
					</div>
        		</form>
        	</div>
			</div>
		</Fragment>
        );
    }
}

export default OwnerEditSchedule;
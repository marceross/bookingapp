import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

/* Import logo image */

const RockCyclingSchedules = () => {
    return (
    	<div className="container">
    	<div className="col-12 schedule">
    		<h1 className="text-center">Rock Cycling</h1>
    		<p className="description-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus libero sit amet quam dictum, id tempor arcu volutpat. Donec nec diam at ante ornare pulvinar.</p>
    		<div className="schedule-card col-12 row">
    			<div className="col-8">
    				<p><span id="time">15</span> Lunes</p>
    				<p><i className="fas fa-clock"></i> 11.00</p>
    			</div>
    			<div className="col-4">
    				<p className="col-12 cost">$100</p>
    			</div>
    		</div>
    		<div className="schedule-card col-12 row">
    			<div className="col-8">
    				<p><span id="time">15</span> Lunes</p>
    				<p><i className="fas fa-clock"></i> 11.00</p>
    			</div>
    			<div className="col-4">
    				<p className="col-12 cost">$100</p>
    			</div>
    		</div>
    		<div className="schedule-card col-12 row">
    			<div className="col-8">
    				<p><span id="time">15</span> Lunes</p>
    				<p><i className="fas fa-clock"></i> 11.00</p>
    			</div>
    			<div className="col-4">
    				<p className="col-12 cost">$100</p>
    			</div>
    		</div>
			<div className="center-col-12">
				<button id="reservar">Reservar</button>
			</div>
    	</div>
    	</div>
    );
}

export default RockCyclingSchedules;
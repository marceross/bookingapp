import React from 'react';
import {Link} from 'react-router-dom';

/* Import logo image */
import RockCycling from './images/rock-cycling.png';
import Climbing from './images/climbing.png';
import Yoga from './images/yoga.png';

const Actividades = () => {
    return (
	<div className="jumbotron col-12 row">
    	<div className="carousel col-12">
    		<h1 className="text-center"><i className="fas fa-bicycle" id="actividades-bicycle"></i>Actividades</h1>
    		<div className="center-col-12 row sliding-images">
    			<div className="col-3" id="left">
    				<img src={Yoga} id="left-image"/>
				</div>
    			<div className="col-6">
    				<img src={RockCycling} id="center-image"/>
				</div>
    			<div className="col-3" id="right">
    				<img src={Climbing} id="right-image"/>
				</div>
			</div>
			<h2 className="text-center">&#x25C4; <span style={{padding: '0 26px'}}>Rock Cycling</span> &#x25BA;</h2>
    	</div>
		<div className="description container">
        	<div className="col-12 row">
            	<div className="col-7">
        			<p>Rock Cycling / Buba gym</p>
				</div>
				<div className="col-5">
                	<i className="fa fa-star" />
                	<i className="fa fa-star" />
                	<i className="fa fa-star" />
                	<i className="fa fa-star" />
                	<i className="fa fa-star" />
                    <span>(5)</span>
                </div>
				<div className="col-12">
					<p className="description-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					<br />
					<div className="center-col-12">
						<button id="mas-info"><Link to="/rock-cycling">Mas Info</Link></button>
					</div>
					<div className="center-col-12">
						<button id="reservar">Reservar</button>
					</div>
      			</div>
			</div>
		</div>
    </div>
    );
}

export default Actividades;
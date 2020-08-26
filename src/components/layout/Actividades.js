import React from 'react';

/* Import logo image */
import RockClimbing from './images/rock-climbing.png';

const Actividades = () => {
    return (
	<div className="jumbotron col-12 row">
    	<div className="carousel col-12">
    		<h1 className="text-center">Actividades</h1>
    		<img src={RockClimbing} />
			<h2 className="text-center">Rock Cycling</h2>
    	</div>
		<div className="description container">
        	<div className="col-12">
        		<p>Rock Cycling / Buba gym</p>
				<br />
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      		</div>
		</div>
    </div>
    );
}

export default Actividades;
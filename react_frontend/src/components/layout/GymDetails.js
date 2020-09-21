import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

/* Import images */
import Photo1 from './images/photo1.png';
import Photo2 from './images/photo2.png';
import Photo3 from './images/photo3.png';
import Map from './images/map.png';

const GymDetails = () => {

	{/*
	
	we need to do the same in functional component
	state = {
        gym: {}
    }

	componentDidMount() {
		fetch('http://127.0.0.1:5000/api/get_gym_details')
		.then(res => res.json())
		.then(res => {this.setState({ gym: res })})
	}

	*/}

	{/*
		and we need to check if gym/response is empty or not 
		if empty we need to give add gym form with all empty input fields
		else we need to give update gym form with old gym details in input field to update
		
		In gym, we have
		gym.id  {we need to send this id inside form as hidden input to api while updating}
		gym.owner_id
		gym.name
		gym.description
		gym.picture_1_file_path 
		gym.picture_2_file_path
		gym.picture_3_file_path
		gym.location
		gym.email
		gym.phone_number

	*/}

    return (
    	<div className="container">
    		<div className="col-12 schedule gym-editar">
    			<div className="center-col-12 row gym-icon">
    				<i className="fas fa-dumbbell"></i>
    			</div>
    			<h1 className="text-center">Buba gym <i className="fas fa-edit"></i></h1>
    			<div className="col-12">
    				<p className="description-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus libero sit amet quam dictum, id tempor arcu volutpat. Donec nec diam at ante ornare pulvinar.</p>
    				<i className="fas fa-edit description-edit"></i>
    			</div>
    			<div className="col-4">
    				<img src={Photo1} alt="Photo 1" />
    			</div>    			
				<div className="col-4">
    				<img src={Photo2} alt="Photo 2" />
    			</div>    			
				<div className="col-4">
    				<img src={Photo3} alt="Photo 3" />
    			</div>
				<p style={{textAlign: 'right'}}>Ver mas <i className="fas fa-edit"></i></p>
				<div className="col-12">
            		<img src={Map} alt="Map" />
    				<i className="fa fa-map-marker"></i>
            	</div>
				<h2 className="text-center">Contacto</h2>
				<div className="col-12 contact-details">
                	<div className="col-2">
                		<i className="fas fa-phone-alt"></i>
					</div>
					<div className="col-8">
						<p>+12345678545</p>
					</div>
					<div className="col-2" style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                		<i className="fas fa-edit"></i>
					</div>
                </div>
				<div className="col-12 contact-details">
                	<div className="col-2">
                		<i className="fas fa-envelope"></i>
					</div>
					<div className="col-8">
						<p>bubagym@gmail.com</p>
					</div>
					<div className="col-2" style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                		<i className="fas fa-edit"></i>
					</div>
                </div>
    		</div>
    	</div>
    );
}

export default GymDetails;
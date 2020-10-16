import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import FlashMessages from './FlashMessages';

/* Import logo image */
import RockCycling from './images/rock-cycling.png';
import Climbing from './images/climbing.png';
import Yoga from './images/yoga.png';


const Actividades = () => {

	const rock_cycling = {
		id: -1,
		name: "Rock Cycling - Buba gym",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		rating: 5,
		image: RockCycling,
	};
	
	const climbing = {
		id: -2,
		name: "Climbing - Buba gym",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		rating: 5,
		image: Climbing,
	};
	
	const yoga = {
		id: -3,
		name: "Yoga - Buba gym",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		rating: 5,
		image: Yoga,
	};

	const [activities, set_activities] = useState([yoga, rock_cycling, climbing]);

	const ratingStars = n => {
        let icons = [];
        for(let i=0; i<n; i++){
            icons.push(<i className="fa fa-star" />)
        }
        return icons;
    }


	useEffect(() => {
		fetch('/api/list_activities', {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
			},
		}).then(res => res.json())
		.then(res => {
			if(res.success)
			{
				set_activities(res.data);			
			}
		});
	},[]);


	
    

	// messages = { message: "your msg", warning: true/false }
	const [flash_messages, set_flash_messages] = useState([]);

	function remove_flash_message(index){
		let new_flash_messages = [];
		for(let i=0; i<flash_messages.length; i++){
			if(i !== index){
				new_flash_messages.push(this.state.flash_messages[i]);
			}
		}

		set_flash_messages(new_flash_messages);
	}


	return (
		<div>
			<FlashMessages messages={ flash_messages } remove_message={remove_flash_message}  />
			<div className="jumbotron col-12 row">
				<div className="carousel col-12">
					<h1 className="text-center">Actividades</h1>
					<hr />
					<br />
					<center>
						<div>
						{
							activities.map( activity => (
								<div className="activity" key={ activity.id } >
									{/* <h3>{ activity.name }&nbsp; &nbsp;{ ratingStars(activity.rating) }</h3> */}
									<h3>{ activity.name }&nbsp; &nbsp;{ ratingStars(5) }</h3>
									
									<hr />
									{/* <img src={ activity.image } alt={ activity.name }/> */}
									<img src={ RockCycling } alt={ activity.name }/>
									<p style={{width: "60%"}}>{ activity.description }</p>
									<hr />
									<div style={{display: "flex", justifyContent: "space-evenly", width: "50%", marginTop: "2%"}}>
										<button id="mas-info"><Link to={  "/activity/" + activity.id }>Mas Info</Link></button>
										<button id="mas-info" style={{marginLeft: "2%", cursor: "pointer"}}><Link to={  "/activity/" + activity.id }>Reservar</Link></button>
									</div>
								</div>
							))
						}
						</div>
					</center>
				</div>
			</div>
		</div>
    );
}

export default Actividades;
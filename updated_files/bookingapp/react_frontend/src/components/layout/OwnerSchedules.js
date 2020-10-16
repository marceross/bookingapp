import React, { Fragment, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import FlashMessages from './FlashMessages';

/* Import logo image */

const OwnerSchedules = () => {

	const initial_state = [
		{
			id: -1,
			name: "Rock Cycling",
			rating: 5,
		},
		{
			id: -2,
			name: "Climbing",
			rating: 5,
		},
		{
			id: -3,
			name: "Running",
			rating: 5,
		},
	]

	const [ schedules, set_schedules ] = useState(initial_state);

	const rating_stars = (rating) => {
		let stars = [];
		for(let i=0; i<rating; i++){
			stars.push(<i className="fa fa-star" key={i} />);
		}
		return stars;
	}


	useEffect(() => {
		fetch('/api/get_my_activities', {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
			},
		}).then(res => res.json())
		.then(res => {
			if(res.success)
			{
				set_schedules(res.data);			
			}
		});
	},[]);


	/*
	const remove_schedule = (schedule, index) => {

		//   API call to remove schedule

		let new_schedule = [];
		schedules.forEach( (val, i) => {
			if(index != i){
				new_schedule.push(val);
			}
		})
		set_schedules(new_schedule);
	}
	*/


	const [flash_messages, set_flash_messages ] = useState([]);

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
		<Fragment>
			<FlashMessages messages={flash_messages} remove_message={ remove_flash_message } />
			<div className="center-col-12">
				<div className="col-12 text-center horarios-lists">
					<i className="fas fa-calendar"></i>
					<h1 className="text-center">Actividades</h1>
				</div>
			</div>
			<div className="col-12 row horarios-lists" style={{marginTop: '0', paddingTop: '0'}}>
				{
					schedules.map( (schedule, i) => {
						return ( 
							<div key={schedule.id}>
								<Link to={{
									pathname:"/edit",
									state: {schedule: schedule},
								}}>
									<div className="schedule-card col-12 row" id="cycling">
										<div className="col-8">
											<h2>{ schedule.name }</h2>
											{/*
												{ rating_stars(schedule.rating) }
												<span>({ schedule.rating })</span>
											*/}
											{ rating_stars(5) }
											<span>({ 5 })</span>
											
										</div>
										{/*
											<div className="col-4">
												<i className="fa fa-minus-circle" onClick={ event => remove_schedule(schedule, i) }></i>
											</div>
										*/}
									
									</div>
								</Link>
							</div>	
						);
					})			
				}
				<div className="center-col-12">
					<button className="blue" id="reservar"><Link to="edit">Cagar Nueva</Link></button>
				</div>
			</div>
		</Fragment>
    );
}

export default OwnerSchedules;
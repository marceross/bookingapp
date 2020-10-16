import React, { useEffect, useState } from 'react';
import FlashMessages from './FlashMessages';


const ActivitySchedules = (props) => {

	const toggle_modal = props.toggle_modal;
	const set_schedule = props.set_schedule;

	const [ selected_schedule, set_selected_schedule ] = useState(-1);

	const show_warning = (msg) => {
		set_flash_messages([{ message: msg, warning: true }]);
	}

	let initial_state = {
		activity_id: props.activity,
		activity_name: "",
		activity_description: "",
		activity_picture_1_file_path: "",
		activity_schedules: [],
	};

	const [activity_details, set_activity_details] = useState({ ...initial_state });

	let activity = {
		name: activity_details.activity_name,
		description: activity_details.activity_description,		
		schedules: activity_details.activity_schedules,
	}

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

	useEffect(() => {
		fetch('/api/get_activity_details?activity_id=' + props.activity, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
			},
		}).then(res => res.json())
		.then(res => {
			if(res.success)
			{
				let initial_state = {
					activity_id: res.data.id,
					activity_name: res.data.name,
					activity_description: res.data.description,
					activity_picture_1_file_path: res.data.picture_1_file_path,
					activity_schedules: res.data.schedules,
				};
				set_activity_details({ ...initial_state });
				if(res.message == 'Activity Not Found')
				{
					set_flash_messages([{ message: "Sorry for Inconvinence, Activity Not Found", warning: true }]);
				}
			}
		});
	},[]);


    return (
    	<div className="container">
			<FlashMessages messages={ flash_messages} remove_message={ remove_flash_message } />
    		<div className="col-12 schedule">
				<h1 className="text-center">{ activity.name}</h1>
				<p className="description-text">{ activity.description }</p>
				{
					activity.schedules.map( (schedule, i) => {
						return (
							<div style={{cursor: "pointer"}} className={ 
								selected_schedule == i ? "schedule-card col-12 row schedule-card-select": "schedule-card col-12 row"} 
								key={ i } onClick={ event => { set_selected_schedule(i); set_schedule(schedule) } }>
								<div className="col-8">
									<p><span id="time">{ schedule.room_count }</span> { schedule.date }</p>
									<p><i className="fas fa-clock"></i> { schedule.time }</p>
								</div>
								<div className="col-4">
									<p className="col-12 cost">${ schedule.fee }</p>
								</div>
							</div>
						);
					})
				}
				
				<div className="center-col-12">
					<button id="reservar" style={{cursor: "pointer"}} onClick={ 
						event => {
							 selected_schedule !== -1 ? toggle_modal(true) : show_warning(" Select any event !") } 
						}>Reservar</button>
				</div>
	    	</div>
    	</div>
    );
}

export default ActivitySchedules;
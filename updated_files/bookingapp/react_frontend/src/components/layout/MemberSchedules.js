import React, { Fragment, useEffect, useState } from 'react';
import FlashMessages from './FlashMessages';
import Modal2 from '../layout/Modal2';


const MemberSchedules = () => {

	const initial_state = [
		{
			reservation_id: -1,
			name: "Rock Cycling",
			date: "Martes",
			time: "11.00",
			fee: 100,
		},
		{
			reservation_id: -2,
			name: "Climbing",
			date: "Jueves",
			time: "17.00",
			fee: 100,
		},
		{
			reservation_id: -3,
			name: "Running",
			date: "Jueves",
			time: "08.00",
			fee: 100,
		},
	]

	const [ schedules, set_schedules ] = useState(initial_state);

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
		fetch('/api/get_my_reservations', {
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

    
    const delete_reservation = (schedule, index) => {

        let data = {
            reservation_id: schedule.reservation_id,
        };	
        fetch('/api/delete_reservation', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(res => {
			set_flash_messages([{ message: res.message, warning: !(res.success) }]);
            if(res.success)
            {
                if(res.message == 'Reservation Deleted successfully')
                {
                    let new_schedule = [];
                    schedules.forEach( (val, i) => {
                        if(index != i){
                            new_schedule.push(val);
                        }
                    });
                    set_schedules(new_schedule);
                }
            }
        }
        ).catch( err => {
            set_flash_messages([{ message: err, warning: true }]);
		}); 
		
		toggle_modal(false);
		
    }
    

    const [ show_modal, set_show_modal ] = useState(false);

    const toggle_modal = (val) => {
		set_show_modal(val);
    }
	
	const [ schedule, set_schedule ] = useState({})
	const [ s_index, set_s_index ] = useState(-1)

	const remove_schedule = (schedule, index) => {
		toggle_modal(true);
		set_schedule(schedule);
		set_s_index(index);

	}


    return (
		<Fragment>
			<FlashMessages messages={ flash_messages } remove_message={ remove_flash_message } />
			<div className="center-col-12">
				<div className="col-12 text-center horarios-lists">
					<i className="fas fa-calendar"></i>
					<h1 className="text-center">Horarios</h1>
				</div>
			</div>
			<div className="col-12 row horarios-lists" style={{marginTop: '0', paddingTop: '0'}}>
				{
					schedules.map( (schedule, i) => {
						return (
							<div className="schedule-card col-12 row" id="running" key={ schedule.reservation_id }>
								<div className="col-8">
									<h2>{ schedule.name }</h2>
									<p><span id="time"> $ { schedule.fee }</span> { schedule.date }</p>
								</div>
								<div className="col-4">
									<i className="fa fa-minus-circle" onClick={ event => remove_schedule(schedule, i) }></i>
									<p><i className="fa fa-clock"></i> { schedule.time }</p>
								</div>
							</div>
						);
					})
				}
				{
					schedules.length === 0 && <h3 className="text-center"> You have no active events... </h3>
				}
			</div>
			{
				show_modal && 
				<Modal2 toggle_modal={ toggle_modal }  delete_reservation={ delete_reservation } schedule={schedule} index={s_index} /> 
			}
		</Fragment>
    );
}

export default MemberSchedules;
import React, { Fragment, Component } from 'react';

/* Import components */
import ActivitySchedules from '../layout/ActivitySchedules';
import FlashMessages from '../layout/FlashMessages';
import Modal from '../layout/Modal';

class Activity extends Component {

	constructor(props){
		super(props);
		this.state = {
			show_modal: false,
			flash_messages: [],
		}

		this.selected_schedule = null;

		this.toggle_modal = this.toggle_modal.bind(this);
		this.reserve = this.reserve.bind(this);
		this.set_schedule = this.set_schedule.bind(this);
		this.remove_flash_message = this.remove_flash_message.bind(this);
	}

	componentDidMount() {
    	const setTransparentToTrue = this.props.setTransparentToTrue;
    	setTransparentToTrue();
	}

	set_schedule(schedule){
		this.selected_schedule = schedule;
	}

	reserve(){
		let schedule = this.selected_schedule;
		
		let data = {
			activity_timeslot_id: schedule.id,
		};	
		fetch('/api/add_reservation', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then(res => {
			this.setState({
				flash_messages: [{ message: res.message, warning: !(res.success) }],
			});
		}
		).catch( err => {
			this.setState({
				flash_messages: [{ message: err, warning: true }],
			});
		});

		this.toggle_modal(false);
	}
	
	toggle_modal(val){
		this.setState(prev => ({...prev, show_modal: val}));
	}

	remove_flash_message(index){
		let new_flash_messages = [];
		for(let i=0; i<this.state.flash_messages.length; i++){
			if(i !== index){
				new_flash_messages.push(this.state.flash_messages[i]);
			}
		}

		this.setState(prev => ({ ...prev, flash_messages: new_flash_messages}));
	}


	render() {
		const { activityname } = this.props.match.params;

		const flash_messages = this.state.flash_messages;

  		return (
    		<Fragment>
				<FlashMessages messages={ flash_messages } remove_message={ this.remove_flash_message } />
        		<div className="top-background">
        		</div>
				<ActivitySchedules key={ activityname } activity={ activityname } toggle_modal={ this.toggle_modal } set_schedule = { this.set_schedule }/>			
        		{
					this.state.show_modal && 
					<Modal toggle_modal={ this.toggle_modal } reserve={ this.reserve } schedule={ this.selected_schedule }/> 
				}
    		</Fragment>
  		);
	}
}

export default Activity;
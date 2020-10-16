import React, { useEffect, useState } from 'react';
import FlashMessages from './FlashMessages';

import Photo1 from './images/photo1.png';
import Photo2 from './images/photo2.png';
import Photo3 from './images/photo3.png';
import Map_Image from './images/map.png';

const GymDetails = () => {

	const DEFAULT_URL = "/";
	const ADD_GYM_URL = "/api/add_gym";
	const UPDATE_GYM_URL = "/api/update_gym";

	const button_style = {
		background: "#4aade0",
		paddingLeft: "2%",
		paddingRight: "2%",
		color: "white",
		margin: "1%",
	}

	var initialstate = {
		gym_id: null,
		gym_name: "",
		gym_description: "",
		gym_picture_1_file_path: Photo1,
		gym_picture_2_file_path: Photo2,
		gym_picture_3_file_path: Photo3,
		gym_location: Map_Image,
		gym_email: "",
		gym_phone_number: "",
	};

	const [initial_state, set_initial_state] = useState({ ...initialstate });

	const [gym_details, set_gym_details] = useState({ ...initial_state });

	const [form_submission_url, set_form_submission_url] = useState(DEFAULT_URL);

	const [page_settings, set_page_settings] = useState({
		name_field_disabled: true,
		description_field_disabled: true,
		phone_field_disabled: true,
		mail_field_disabled: true,
	});

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


	function check_for_changes(){
		if(gym_details.gym_id !== initial_state.gym_id || gym_details.gym_name !== initial_state.gym_name
			|| gym_details.gym_description !== initial_state.gym_description || gym_details.gym_picture_1_file_path !== initial_state.gym_picture_1_file_path ||
			gym_details.gym_picture_2_file_path !== initial_state.gym_picture_2_file_path || gym_details.gym_picture_3_file_path !== initial_state.gym_picture_3_file_path
			|| gym_details.gym_location !== initial_state.gym_location || gym_details.gym_email !== initial_state.gym_email
			|| gym_details.gym_phone_number !== initial_state.gym_phone_number )
			{
				return true;
			}
		return false;
	}

	function handleChange(field, event){
		event.persist();
		switch(field){
			case "gym_name": set_gym_details({ ...gym_details, gym_name: event.target.value }); break;
			case "gym_description": set_gym_details({ ...gym_details, gym_description: event.target.value }); break;
			case "gym_phone": set_gym_details({ ...gym_details, gym_phone_number: event.target.value }); break;
			case "gym_mail": set_gym_details({ ...gym_details, gym_email: event.target.value }); break;
		}
	}

	function updateDetails(){
		let data = {
			name: gym_details.gym_name,
			description: gym_details.gym_description,
			location: gym_details.gym_location,
			email: gym_details.gym_email,
			phone_number: gym_details.gym_phone_number,
			//picture_1_file_path: gym_details.gym_picture_1_file_path,
			//picture_2_file_path: gym_details.gym_picture_2_file_path,
			//picture_3_file_path: gym_details.gym_picture_3_file_path,
		};	
		fetch(form_submission_url, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then(res => {
			set_flash_messages([{ message: res.message, warning: !(res.success) }]);
			if(res.success){
				set_initial_state({ ...gym_details});
			}
		}
		).catch( err => {
			set_flash_messages([{ message: err, warning: true }]);
		});
	}

	useEffect(() => {
		fetch('/api/get_gym_details', {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
			},
		}).then(res => res.json())
		.then(res => {
			if(res.success)
			{
				initial_state.gym_id = res.data.gym_id;
				initial_state.gym_name = res.data.name;
				initial_state.gym_description = res.data.description;
				//initial_state.gym_picture_1_file_path = res.data.picture_1_file_path;
				//initial_state.gym_picture_2_file_path = res.data.picture_2_file_path;
				//initial_state.gym_picture_3_file_path = res.data.picture_3_file_path;
				//initial_state.gym_location = res.data.location;
				initial_state.gym_email = res.data.email;
				initial_state.gym_phone_number = res.data.phone_number;
				set_gym_details({ ...initial_state });
				set_initial_state({ ...initial_state});
				if(res.message == 'No Gym for Current User')
				{
					set_form_submission_url(ADD_GYM_URL);
					set_flash_messages([{ message: "No Gym for Current User. Pls fill the form and save to add gym", warning: false }]);
				}else{
					set_form_submission_url(UPDATE_GYM_URL);
				}
			}
		});
	  },[]);
	

    return (
    	<div className="container">
			<FlashMessages messages={ flash_messages } remove_message={remove_flash_message} />
    		<div className="col-12 schedule gym-editar">
    			<div className="center-col-12 row gym-icon">
    				<i className="fas fa-dumbbell"></i>
    			</div>
    			<div >
					<center>
						{
							page_settings.name_field_disabled ? <h1 style={{display: "inline-block"}}>{ gym_details.gym_name } </h1>:
							<input id="gym_name" className="text-center" type="text" value={ gym_details.gym_name } style={{
								background:"none", width:"max-content", display: "inline-block"}} 
								disabled={ page_settings.name_field_disabled } onChange={ event => handleChange("gym_name", event) } />									
						}

					<i className="fas fa-edit" style={{marginLeft: "30px"}} onClick={ () => {
						let toggle = !page_settings.name_field_disabled;
						set_page_settings({ ...page_settings, name_field_disabled: toggle });						
					} }></i>

					</center>
				</div>

    			<div className="col-12">

					{
						page_settings.description_field_disabled ? <p>&nbsp;{ gym_details.gym_description }</p> :
						<textarea id="gym_description" className="description-text" style={{ background: "none", resize:"none" }}
						onChange={ event => handleChange("gym_description", event) }>
							{ gym_details.gym_description }
						</textarea>
					}

    				<i className="fas fa-edit description-edit" onClick={ event => {
						let toggle = !page_settings.description_field_disabled;
						set_page_settings({ ...page_settings, description_field_disabled: toggle });
					}}></i>

    			</div>
    			<div className="col-4">

					<input type="file" style={{ display: "none" }} id="pic1_file" onChange={ event => {
						event.persist();
						if(event.target.files[0] !== undefined){
							let f = new FileReader();
							f.readAsDataURL(event.target.files[0]);
							f.onload = res => {
								set_gym_details({ ...gym_details, gym_picture_1_file_path: res.target.result });
							}
						}
					}} />
    				<img id="pic1" className="gym-edit-pic" src={ gym_details.gym_picture_1_file_path } alt="Photo 1"
					onClick={ event => document.getElementById('pic1_file').click() }/>

    			</div>

				<div className="col-4">

					<input type="file" style={{ display: "none" }} id="pic2_file" onChange={ event => {
						event.persist();
						if(event.target.files[0] !== undefined){
							let f = new FileReader();
							f.readAsDataURL(event.target.files[0]);
							f.onload = res => {
								set_gym_details({ ...gym_details, gym_picture_2_file_path: res.target.result });
							}
						}
					}}/>
    				<img id="pic2" className="gym-edit-pic" src={ gym_details.gym_picture_2_file_path } alt="Photo 2" 
					onClick={ event => document.getElementById('pic2_file').click() } />
    			
				</div>    	

				<div className="col-4">

					<input type="file" style={{ display: "none" }} id="pic3_file" onChange={ event => {
						event.persist();
						if(event.target.files[0] !== undefined){
							let f = new FileReader();
							f.readAsDataURL(event.target.files[0]);
							f.onload = res => {
								set_gym_details({ ...gym_details, gym_picture_3_file_path: res.target.result });
							}
						}
					}}/>
    				<img id="pic3" className="gym-edit-pic" src={ gym_details.gym_picture_3_file_path } alt="Photo 3" style={{ cursor: "pointer" }} 
					onClick={ event => document.getElementById('pic3_file').click() } />

    			</div>

				<p style={{textAlign: 'right'}}>Ver mas <i className="fas fa-edit"></i></p>
				<div className="col-12">
            		<img src={ gym_details.gym_location } alt="Map" />
    				<i className="fa fa-map-marker"></i>
            	</div>
				<h2 className="text-center">Contacto</h2>
				<div className="col-12 contact-details">
                	<div className="col-2">
                		<i className="fas fa-phone-alt"></i>
					</div>
					<div className="col-8">
						{
							page_settings.phone_field_disabled ? <p>{ gym_details.gym_phone_number }</p>: 
							<input type="tel" value={ gym_details.gym_phone_number } 
							style={{background:"none", border: "2px solid gray"}} onChange={ event => handleChange("gym_phone", event)} /> 
						}
						
					</div>
					<div className="col-2" style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>

                		<i className="fas fa-edit" onClick={event => {
							let toggle = !page_settings.phone_field_disabled;
							set_page_settings({ ...page_settings, phone_field_disabled: toggle});
						}}></i>

					</div>
                </div>
				<div className="col-12 contact-details">
                	<div className="col-2">
                		<i className="fas fa-envelope"></i>
					</div>
					<div className="col-8">
						{
							page_settings.mail_field_disabled ? <p>{ gym_details.gym_email }</p> : 
							<input type="email" value={ gym_details.gym_email } style={{background:"none", border: "2px solid gray"}}
							onChange={ event => handleChange("gym_mail", event) }/> 
						}
						
					</div>
					<div className="col-2" style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                		
						<i className="fas fa-edit" onClick={ event => {
							let toggle = ! page_settings.mail_field_disabled;
							set_page_settings({ ...page_settings, mail_field_disabled: toggle });
						}}></i>
					
					</div>
                </div>
				{
					check_for_changes() && <center> 
						<button type="button" style={button_style} onClick={ event => updateDetails() }>Save</button> 
						<button type="button" style={button_style} onClick={ event => set_gym_details({ ...initial_state })}>Cancel</button> 
					</center>
				}
    		</div>
    	</div>
    );
}

export default GymDetails;
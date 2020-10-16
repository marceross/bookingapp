import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import FlashMessages from './FlashMessages';
import ProfilePic from './images/profile-picture.png';


class OwnerDetailsForm extends Component {

	constructor(props){
		super(props);
		this.state = {
			userid: "",
			user_name:"",
			first_name: "",
			last_name: "",
			dob: "",
			phone: "",
			emergency_telephone: "",
			mail: "",
			certificate: null,
			profile_picture: null,
			flash_messages: [],
		}

		this.handleInput = this.handleInput.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.remove_flash_message = this.remove_flash_message.bind(this);
	}

	handleInput(field, event){
		event.persist();
		switch(field){
			case "user_name": this.setState((prev)=>{
				return {...prev, user_name: event.target.value }
				});
				break;
			case "first_name": this.setState((prev)=>{
				return {...prev, first_name: event.target.value }
				});
				break;
			case "last_name": this.setState((prev)=>{
				return {...prev, last_name: event.target.value }
				});
				break;
			case "dob": this.setState((prev)=>{
				return {...prev, dob: event.target.value }
				});
				break;
			case "phone": this.setState((prev)=>{
				return {...prev, phone: event.target.value }
				});
				break;
			case "emergency_telephone": this.setState((prev)=>{
				return {...prev, emergency_telephone: event.target.value }
				});
				break;
			case "mail": this.setState((prev)=>{
				return {...prev, mail: event.target.value }
				});
				break;
		}
	}

	componentDidMount() {
		fetch('/api/get_current_user', {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
			},
		}).then(res => res.json())
		.then(res => {
			if(res.success)
			{
				this.setState({
					userid: res.data.user_id,
					user_name: res.data.user_name,
					first_name: res.data.first_name,
					last_name: res.data.sur_name,
					dob: res.data.dob,
					phone: res.data.phone_number_1,
					emergency_telephone: res.data.phone_number_2,
					mail: res.data.email,
				});
			}
			
		});
	}

	submitForm(event){
		event.preventDefault();
		let data = {
			user_name: this.state.user_name,
			first_name: this.state.first_name,
			sur_name: this.state.last_name,
			dob: this.state.dob,
			phone1: this.state.phone,
			phone2: this.state.emergency_telephone,
			email: this.state.mail,
			//medic_certificate: this.state.certificate,
			//profile_pic: this.state.profile_picture,
		};	

		fetch('/api/update_user', {
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
		const flash_messages = this.state.flash_messages;

    	return (
        <Fragment>
			<FlashMessages messages={ flash_messages } remove_message={ this.remove_flash_message } />
			<div className="container">
        	<div className="col-12 row">
        		<form className="editar-form" onSubmit={this.submitForm}>
            		<div className="col-12">
            			<div className="col-6">

        					<label>Usuario</label>
							<input type="text" value={this.state.user_name} onChange={
								(event) => {this.handleInput("user_name", event)}
							}/>

        					<label>Nombre*</label>
							<input type="text" value={this.state.first_name} onChange={
								(event) => {this.handleInput("first_name", event)}
							} />

        					<label>Apellido*</label>
							<input type="text" value={this.state.last_name} onChange={
								(event) => {this.handleInput("last_name", event)}
							}/>

        					<label>Fecha de nacimiento*</label>
							<input type="date" value={this.state.dob} onChange={
								(event) => {this.handleInput("dob", event)}
							}/>

						</div>

						<div className="col-6 photo-box" >
							
							<input type="file" id='profile_pic' style={{display: 'none'}} onChange={
								event => {
									event.persist();
									if(event.target.files[0] != undefined){
										this.setState( prev => {
											return { ...prev, profile_picture: event.target.files[0] }
										})		
									}
								}
							 }/>
							<center>
								<img src={ (()=>{
									if(this.state.profile_picture === null ){
										return ProfilePic;
									}
									else{
										let f = new FileReader();
										f.readAsDataURL(this.state.profile_picture);
										f.onload = (res) => {
											document.getElementById('profile_pic_preview').src = res.target.result;
										}
									}
								})()} 
									alt="Your profile picture" id='profile_pic_preview' style={
										{ width: '200px', cursor: 'pointer', height: "200px", borderRadius:"50%", border:"5px solid lightblue" }
										}
									onClick={
										event => document.getElementById('profile_pic').click()
									}
								/>
							</center>
							<p className="text-center">Camblar foto</p>

                        </div>

					</div>
            		<div className="col-12 row">
            			<div className="col-6">

        					<label>Numero de telefono*</label>
							<input type="tel" value={this.state.phone} onChange={
								(event) => {
									this.handleInput("phone", event)
								}
							}/>
							
						</div>
            			<div className="col-6" style={{ paddingLeft: '15pt' }}>

        					<label>Tel. emergencia</label>
							<input type="tel" value={this.state.emergency_telephone} onChange={
								(event) => {
									this.handleInput("emergency_telephone", event)
								}
							}/>

						</div>
					</div>
            		<div className="col-12">
            			<div className="col-8">

        					<label>Mail*</label>
							<input type="email" value={this.state.mail} onChange={
								(event) => {
									this.handleInput("mail", event)
								}
							}/>

						</div>
					</div>
            		<div className="col-12 row">
            			<div className="center-col-12 row upload">
                        	<div className="col-6">
        						<label>
									<span>Certificado medico </span>
									<span id='certificate_filename' style={{color:'blue'}}>
										{ this.state.certificate  !== null && ":" + this.state.certificate.name }
									</span>
								</label>
							</div>
                            <div className="col-6">
								<input type="file" id="files" style={{ display: 'none' }} onChange={ 
									event => {
										event.persist();
										if(event.target.files[0] != undefined){
											this.setState( prev => {
												return { ...prev, certificate: event.target.files[0] }
											})
										}
									}
								}/>
								<button v className="blue" id="select-file" type="button"
								onClick={ event => document.getElementById('files').click() }>Cargar</button>
                            </div>
						</div>
					</div>
            		<div className="center-col-12">
            			<div className="col-8" style={{paddingRight: '16px'}}>
        					<label>Mi gym</label>
						</div>
						<div className="col-4">
							<button type="button" className="blue" id="select-file" >
								<Link to='/gym-editar'>Editar</Link>
							</button>
                        </div>
					</div>
					<br />
					<div className="center-col-12">
						<button type="submit" className="blue" id="reservar">Actualizar</button>
					</div>
        		</form>
        	</div>
			</div>
		</Fragment>
        );
    }
}

export default OwnerDetailsForm;
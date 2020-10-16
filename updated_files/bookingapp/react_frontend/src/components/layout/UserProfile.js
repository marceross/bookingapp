import React, {Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import FlashMessages from './FlashMessages';

/* Import images */
import ProfilePicture from './images/profile-picture.png';

class UserProfile extends Component {

	constructor(props){
		super(props);
		this.state = {
			user_name: "",
			mail: "",
			flash_messages: [],
		}
		this.remove_flash_message = this.remove_flash_message.bind(this);
	}

	componentDidMount() {
		fetch('http://127.0.0.1:5000/api/get_current_user', {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
			},
		}).then(res => res.json())
		.then(res => {
			if(res.success)
			{
				this.setState({
					user_name: res.data.user_name,
					mail: res.data.email,
				});
			}
			
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
				<div className="col-12 row configuracion">
				<div className="carousel col-12">
						{(this.props.mode === 'member-mode') ? (
								<h1 className="text-center orange-text">Configuraction</h1>
							) : (
								<h1 className="text-center dark-blue-text">Configuraction</h1>
							)
						}
					<div className="center-col-12 row sliding-images">
						<div className="col-12 image-wrapper">
							<img src={ProfilePicture} alt="Your profile picture" style={{ width: '100%' }}/>
						</div>
					</div>
					<h1 className="text-center">{ this.state.user_name }</h1>
					<p className="text-center">{ this.state.mail }</p>
					<div className="center-col-12">
						{(this.props.mode === 'member-mode') ? (
								<button id="mas-info">
									<Link to='/editar'>Editar</Link>
								</button>
							) : (
								<button className="blue" id="mas-info">
									<Link to='/editar'>Editar</Link>
								</button>
							)
						}
					</div>
				</div>
				<div className="col-12 fit-bar">
					<label className="switch">
						<input type="checkbox" onClick={this.props.changeMode} />
						{(this.props.mode === 'member-mode') ? (
								<span className="slider round orange-slider"></span>
							) : (
								<span className="slider round blue-slider"></span>
							)
						}
					</label>
					{(this.props.mode === 'member-mode') ? <p>Fit</p> : <p>Gym</p>}
				</div>
				{(this.props.mode === 'member-mode') ? ( 
						<div></div>
					) : (
						<Fragment>
							<div className="col-12 fit-bar">
								<p><i className="fa fa-line-chart"></i>Estadisticas</p>
							</div>
							<div className="col-12 fit-bar">
								<p><i className="fas fa-search-dollar"></i>Historial</p>
							</div>
						</Fragment>
					)
				}
				<div className="col-12 fit-bar">
					<a href="/logout"><p><i className="fas fa-sign-out-alt"></i> Cerrar sesion</p></a>
				</div>
			</div>
		</Fragment>
		);
	}
}

export default UserProfile;
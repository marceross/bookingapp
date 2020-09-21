import React, { Fragment, Component } from 'react';

// Import images
import ProfilePic from './images/profile-picture.png';

class MemberDetailsForm extends Component {
		
	state = {
        current_user: {}
    }

	componentDidMount() {
		fetch('http://127.0.0.1:5000/api/get_current_user')
		.then(res => res.json())
		.then(res => {this.setState({ current_user: res })})
	}

	render() {
    	return (
        <Fragment>
			<div className="container">
        	<div className="col-12 row">
        		<form className="editar-form" action="/api/update_user" method="post">
            		<div className="col-12">
            			<div className="col-6">
        					<label>Usuario</label>
							<input type="text" name="user_name" value={this.state.current_user.user_name}/>
        					<label>Nombre*</label>
							<input type="text" name="first_name" value={this.state.current_user.first_name}/>
        					<label>Apellido*</label>
							<input type="text" name="sur_name" value={this.state.current_user.sur_name}/>
        					<label>Fecha de nacimiento*</label>
							<input type="date" name="dob" value={this.state.current_user.dob}/>
						</div>
						<div className="col-6 photo-box">
							{/* input tag with name="profile_pic"  */}
                        	<img src={ProfilePic} alt="Your profile picture"  style={{width: '100%'}}/>
							<p className="text-center">Camblar foto</p>
                        </div>
					</div>
            		<div className="col-12 row">
            			<div className="col-6">
        					<label>Numero de telefono*</label>
							<input type="tel" name="phone1" value={this.state.current_user.phone_number_1}/>
						</div>
            			<div className="col-6" style={{ paddingLeft: '15pt' }}>
        					<label>Tel. emergencia</label>
							<input type="tel" name="phone2" value={this.state.current_user.phone_number_2}/>
						</div>
					</div>
            		<div className="col-12">
            			<div className="col-8">
        					<label>Mail*</label>
							<input type="email" name="email" value={this.state.current_user.email}/>
						</div>
					</div>
            		<div className="col-12 row">
            			<div className="center-col-12 row upload">
                        	<div className="col-6">
        						<label>Certificado medico</label>
							</div>
                            <div className="col-6">
                            <input type="file" id="files" name="medic_certificate" style={{ display: 'none' }}/>
							</div>
						</div>
					</div>
					<div className="center-col-12">
						<button type="submit" id="reservar">Actualizar</button>
					</div>
        		</form>
        	</div>
			</div>
		</Fragment>
        );
    }
}

export default MemberDetailsForm;
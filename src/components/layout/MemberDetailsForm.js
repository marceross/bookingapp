import React, { Fragment, Component } from 'react';

// Import images
import ProfilePic from './images/profile-picture.png';

class MemberDetailsForm extends Component {
	render() {
    	return (
        <Fragment>
			<div className="container">
        	<div className="col-12 row">
        		<form className="editar-form">
            		<div className="col-12">
            			<div className="col-6">
        					<label>Usuario</label>
							<input type="text" />
        					<label>Nombre*</label>
							<input type="text" />
        					<label>Apellido*</label>
							<input type="text" />
        					<label>Fecha de nacimiento*</label>
							<input type="text" />
						</div>
						<div className="col-6 photo-box">
                        	<img src={ProfilePic} alt="Your profile picture"  style={{width: '100%'}}/>
							<p className="text-center">Camblar foto</p>
                        </div>
					</div>
            		<div className="col-12 row">
            			<div className="col-6">
        					<label>Numero de telefono*</label>
							<input type="tel" />
						</div>
            			<div className="col-6" style={{ paddingLeft: '15pt' }}>
        					<label>Tel. emergencia</label>
							<input type="tel" />
						</div>
					</div>
            		<div className="col-12">
            			<div className="col-8">
        					<label>Mail*</label>
							<input type="email" />
						</div>
					</div>
            		<div className="col-12 row">
            			<div className="center-col-12 row upload">
                        	<div className="col-6">
        						<label>Certificado medico</label>
							</div>
                            <div className="col-6">
                            <input type="file" id="files" style={{ display: 'none' }}/>
							<button id="select-file">Cargar</button>
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
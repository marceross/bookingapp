import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

/* Import images */
import ProfilePicture from './images/profile-picture.png';

const UserProfile = ({ match }) => {
	return (
    <Fragment>
	<div className="col-12 row configuracion">
    	<div className="carousel col-12">
    		<h1 className="text-center">Configuracion</h1>
    		<div className="center-col-12 row sliding-images">
    			<div className="col-12 image-wrapper">
    				<img src={ProfilePicture} alt="Your profile picture" style={{ width: '100%' }}/>
				</div>
			</div>
			<h1 className="text-center">Tutku Unlu</h1>
			<p className="text-center">tutkumtepe@gmail.com</p>
			<div className="center-col-12">
				<button id="mas-info"><Link to='/editar'>Editar</Link></button>
			</div>
    	</div>
		<div className="col-12 fit-bar">
        	<label class="switch">
  				<input type="checkbox" />
  				<span class="slider round"></span>
			</label>
        	<p>Fit</p>
        </div>
    </div>	
	<div className="col-12 row logout">
		<div className="col-12 fit-bar">
        	<p><i className="fas fa-sign-out-alt"></i> Cerrar sesion</p>
        </div>
    </div>
	</Fragment>
    );
}

export default UserProfile;
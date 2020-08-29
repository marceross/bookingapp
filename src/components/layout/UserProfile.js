import React, {Fragment, Component} from 'react';
import {Link} from 'react-router-dom';

/* Import images */
import ProfilePicture from './images/profile-picture.png';

class UserProfile extends Component {
    render() {
	return (
    <Fragment>
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
			<h1 className="text-center">Tutku Unlu</h1>
			<p className="text-center">tutkumtepe@gmail.com</p>
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
        	<p><i className="fas fa-sign-out-alt"></i> Cerrar sesion</p>
        </div>
    </div>	
	</Fragment>
    );
	}
}

export default UserProfile;
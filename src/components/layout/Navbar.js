import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

/* Import logo image */
import logo from './images/logo.png';

class Navbar extends Component {
    render() {
        const navbarClassNames = this.props.navbarClassNames;
        return (
        	<Fragment>
            <div className={navbarClassNames}>
        		<div className="center-col-12 row">
        			<div className="col-5">
                		<ul>
                    		<li className="navbar-logo">
                    	    	<Link to='/'>
                                	<img src={logo} alt="The Cumpa Logo"/>
                                </Link>
                    		</li>
                		</ul>
					</div>
					<div className="col-7">
                		<div id="search-bar">
                			<form>
                				<input type="search" placeholder="Fit / Gym"/>
                                <i className="fa fa-search"></i>
                			</form>
                		</div>
					</div>
				</div>
            </div>
			</Fragment>
        );
    }
}

export default Navbar;
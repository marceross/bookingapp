import React, {Component} from 'react';

/* Import logo image */
import logo from './images/logo.png';

class Navbar extends Component {
    render() {
        return (
            <div className="col-12 navbar">
        		<div className="center-col-12 row">
        			<div className="col-5">
                		<ul>
                    		<li className="navbar-logo">
                    	    	<img src={logo} alt="The Cumpa Logo"/>
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
        );
    }
}

export default Navbar;
import React, {Component} from 'react';

/* Import logo image */
import logo from './images/logo.png';

class Navbar extends Component {
    render() {
        return (
            <nav>
                <ul style={{listStyleType: 'none'}}>
                    <li className="navbar-logo">
                        <img src={logo} alt="The Cumpa Logo"/>
                    </li>
                </ul>
                <div id="search-bar">
                </div>
            </nav>
        );
    }
}

export default Navbar;
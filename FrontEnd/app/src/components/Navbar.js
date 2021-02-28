import React, {useState} from 'react';
import {faBars, faTimes, faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';
import '../styles/Navbar.css';

/**
 * the component navbar visible from all the screen
 * @returns {JSX.Element}
 * @constructor
 */
export default function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <FontAwesomeIcon icon={faHome}/>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <FontAwesomeIcon icon={click ? faTimes : faBars}/>
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to="/test" className="nav-links" onClick={closeMobileMenu}>
                                Test
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/stats" className="nav-links" onClick={closeMobileMenu}>
                                Stats
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/aboutus"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                About Us
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

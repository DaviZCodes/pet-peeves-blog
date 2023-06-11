import React from 'react';
import {Link} from "react-router-dom";  
import './NavBar.css';

function NavBar() {
    return (
        <div className="NavBar">
            <nav className="links">
                <Link to = "/"> Pet Peeves </Link>
                <Link to = "/about"> About Us </Link>
                <Link to = "/login"> Login </Link>
                <Link to = "/register"> Register </Link>
            </nav>
        </div>
    );

}

export default NavBar;
import React from 'react';
import {Link} from "react-router-dom";  
import './NavBar.css';

function NavBar() {
    return (
        <div className="NavBar">
            <header>
                <Link to = "/"> Pet Peeves! </Link>
            </header>
            <nav className="links">
                <Link to = "/about"> About Us </Link>
                <Link to = "/login"> Login </Link>
                <Link to = "/register"> Register </Link>
                <Link to = "/post"> Post </Link>
            </nav>
        </div>
    );

}

export default NavBar;
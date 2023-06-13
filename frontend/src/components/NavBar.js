import React from 'react';
import {Link} from "react-router-dom";  
import './NavBar.css';
//import catImage from './images/cat-cartoon.png';

function NavBar() {
    return (
        <div className="NavBar">
            <header>
                <Link to = "/"> Pet Peeves! </Link>
            </header>
            {/*<img src = {catImage} id = "cat" alt = "Cat"></img>*/}
            <nav className="links">
                <Link to = "/about"> About Us </Link>
                <Link to = "/login"> Login </Link>
                <Link to = "/post"> Post </Link>
            </nav>
        </div>
    );

}

export default NavBar;
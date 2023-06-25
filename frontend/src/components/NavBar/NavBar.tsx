import React, {useState, useEffect} from 'react';
import catLogo from "./images/cat logo.png"
import {Link, useNavigate} from "react-router-dom";  
import axios from 'axios';
import './NavBar.css';
//import catImage from './images/cat-cartoon.png';

function NavBar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string|null>(null);

    //see if logged in
    useEffect(() => {
        fetchProfile();
      }, []);
    
    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8019/profile', { withCredentials: true });

            if (response.status === 200) {
            const user = response.data;
            setUsername(user);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        navigate("/login");
    }

    return (
        <div className="NavBar">
            <header>
            <Link to = "/"> Pet Peeves! </Link>
            </header>
            {/*<img src = {catImage} id = "cat" alt = "Cat"></img>*/}
            <nav className="links">
                <Link to = "/about"> About Us </Link>
                {username && (
                    <>
                    <Link to = "/post"> Post </Link>
                    <p onClick={handleLogout}>Logout</p>
                    </>
                )}
                {!username && (
                    <>
                    <Link to = "/login"> Login </Link>
                    </>
                )}
            </nav>
        </div>
    );

}

export default NavBar;
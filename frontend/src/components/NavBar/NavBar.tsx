import React, {useState, useEffect} from 'react';
import catLogo from "./images/cat logo.png"
import {Link, useNavigate} from "react-router-dom";  
import axios from 'axios';
import './NavBar.css';
//import catImage from './images/cat-cartoon.png';

function NavBar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string|null>(null);

    // See if logged in
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const authToken = localStorage.getItem("authToken"); // Retrieve the authentication token from local storage
        if (!authToken) {
          // Handle the case when the token is not available
          console.log('Token not available');
          return;
        }

        const response = await axios.get('http://localhost:8019/user', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          console.log("Working");
          const user = response.data;
          setUsername(user.username);
        }
      } catch (error) {
        console.log("Failed");
        console.log(error);
      }
    };
    fetchData();
  });


    const handleLogout = () => {
        document.cookie = "PETLOGGER-AUTH=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
        navigate("/login");
      };

    return (
        <div className="NavBar">
            <header>
            <Link to = "/"> Pet Peeves! </Link>
            </header>
            {/*<img src = {catImage} id = "cat" alt = "Cat"></img>*/}
            <nav className="links">
                <Link to = "/about"> About Us </Link>
                {username ? (
                    <>
                    <Link to = "/post"> Post </Link>
                    <p onClick={handleLogout}>Logout</p>
                    </>
                ) :
                (
                    <>
                    <Link to = "/login"> Login </Link>
                    </>
                )}
            </nav>
        </div>
    );

}

export default NavBar;
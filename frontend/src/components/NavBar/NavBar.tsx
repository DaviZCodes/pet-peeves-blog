import React, {useState, useEffect} from 'react';
import catLogo from "./images/cat logo.png"
import {Link, useNavigate} from "react-router-dom";  
import axios from 'axios';
import './NavBar.css';
//import catImage from './images/cat-cartoon.png';

function NavBar() {

    const navigate = useNavigate();
    const [username, setUsername] = useState<string|null>(null);

    //login notification
    const [showLoginNotification, setShowLoginNotification] = useState(false);
    //logout notification
    const [showLogoutNotification, setShowLogoutNotification] = useState(false);

    // See if logged in
  useEffect(() => {

    //for testing purposes
    const token = localStorage.getItem("token");
    if (token) {
      setUsername("user");
      setShowLoginNotification(true);
    }

    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get('http://localhost:8019/user', {
          withCredentials: true, //use cookies to check if user is logged in
        });

        if (response.status === 200) {
          console.log("Working");
          const user = response.data;
          setUsername(user.username);
          setShowLoginNotification(true);
        }

      } 
      catch (error) {
        console.log("Failed");
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //logout notification
  useEffect(() => {
    let loginNotificationTime:any;
    let logoutNotificationTime:any;

    if (showLoginNotification) {
      loginNotificationTime = setTimeout(() => {
        setShowLoginNotification(false);
      }, 2500)
    }

    if (showLogoutNotification) {
      logoutNotificationTime = setTimeout(() => {
        setShowLogoutNotification(false);
      }, 2500)
    }

    return () => {
      clearTimeout(loginNotificationTime);
      clearTimeout(logoutNotificationTime);
    };

  }, [showLoginNotification, showLogoutNotification]);
    

    const handleLogout = () => {

      //for testing purposes
      localStorage.removeItem("token");

      document.cookie = "PETLOGGER-AUTH=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUsername(null); //since logged out, no more username on navbar
      setShowLogoutNotification(true); //notification

      navigate("/login");
      };

    return (
        <div className="NavBar">
            <header>
            <Link to = "/"> Pet Peeves!</Link>
            </header>
            {/*<img src = {catImage} id = "cat" alt = "Cat"></img>*/}
            <nav className="links">
                <Link to = "/about">About Us</Link>
                {username ? (
                    <>
                    <Link to = "/post">Post</Link>
                    <p onClick={handleLogout}>Logout</p>
                    </>
                ) :
                (
                    <>
                    <Link to = "/login">Login</Link>
                    </>
                )}
            </nav>
            
            {/* notifications */}
            {showLoginNotification && !showLogoutNotification && (
                  <p id = "notif">Successfully logged in</p>
             )}
            {showLogoutNotification && (
                  <p id = "notif">Successfully logged out</p>
             )}

        </div>
    );

}

export default NavBar;
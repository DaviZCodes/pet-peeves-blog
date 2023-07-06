import {useState, useEffect, useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";  
import axios from 'axios';
import "./NavBar.scss";
import { UserContext } from '../UserContext/UserContext';

function NavBar() {

    const {userInfo, setUserInfo} = useContext(UserContext);
    const navigate = useNavigate();
    //const [username, setUsername] = useState<string|null>(null);

    //login notification
    const [showLoginNotification, setShowLoginNotification] = useState<boolean>(false);
    //logout notification
    const [showLogoutNotification, setShowLogoutNotification] = useState<boolean>(false);

    // See if logged in
  useEffect(() => {

    //for frontend testing purposes
    const token = localStorage.getItem("token");
    if (token) {
      //setUsername("user");
      setUserInfo("user");
      setShowLoginNotification(true);
    }

    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get("http://localhost:8019/user", {
          withCredentials: true, //use cookies to check if user is logged in
        });

        if (response.status === 200) {
          const user = response.data;
          setUserInfo(user.username);
          //setUsername(user.username);
          setShowLoginNotification(true);
        }

      } 
      catch (error) {
        console.log("Failed to logisn");
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //if user info changes and it is not empty, show log in notification
  useEffect(() => {
    if (userInfo !== null){
      setShowLoginNotification(true);
    }
  }, [userInfo])

  //logout notification
  useEffect(() => {
    let loginNotificationTime:number;
    let logoutNotificationTime:number;

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
      setUserInfo(null);
      //setUsername(null); //since logged out, no more username on navbar
      setShowLogoutNotification(true); //notification

      navigate("/login");
      };

    return (
        <div className="NavBar">
            <header>
            <Link to = "/" title="Home Page"> Pet Peeves!</Link>
            </header>
            {/*<img src = {catImage} id = "cat" alt = "Cat"></img>*/}
            <nav className="links">
                <Link to = "/about">About Us</Link>
                {userInfo ? (
                    <>
                    <Link to = "/post">Post</Link>
                    <Link to = "/profile">Profile</Link>
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
                  <p id = "notif-in">Successfully logged in</p>
             )}
            {showLogoutNotification && (
                  <p id = "notif-out">Successfully logged out</p>
             )}

        </div>
    );

}

export default NavBar;
import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import "./Login.css"

function Login() {

    useEffect(() =>{
        document.title = "Login!"
    }, [])

    return (
        <div className="login">
            <div className="container">
            <h1>Login</h1>
            Username: <input type="text" id = "username"></input>
            <br></br>
            Password: <input type="text" id = "password"></input>
            <Link to = "/register" id = "register">
            <h3 id = "question">Don't have an account?</h3>
            </Link>
            <Link to = "/register" id = "register"> Register </Link>
            </div>
        </div>
    );
}

export default Login;
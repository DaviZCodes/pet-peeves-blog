import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {

    //useState for username and passwords
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //waiting for submit button
    async function submit(element: { preventDefault: () => void; }) {
        element.preventDefault();

        try {
            await axios.post("http://localhost:3000/", {
                username, password
            })
        }

        catch (error) {
            console.log(error);
        }
    }

    //change tab title
    useEffect(() =>{
        document.title = "Login!"
    }, [])

    return (
        <div className="login">
            <div className="container">
            <h1>Login</h1>
            <form action="POST">
                Username: <input type="username" id = "username" placeholder="username" onChange={(element) => {setUsername(element.target.value);}}></input>
                Password: <input type="password" id = "password" placeholder="password" onChange={(element) => {setPassword(element.target.value);}}></input>
                <input type="submit" onClick={submit} id = "submit"></input>
            </form>
        
            <Link to = "/register" id = "register">
            <h3 id = "question">Don't have an account?</h3>
            </Link>
            <Link to = "/register" id = "register2"> Register </Link>
            </div>
        </div>
    );
}

export default Login;
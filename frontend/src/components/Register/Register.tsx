import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Register.css"

function Register() {
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
    useEffect(() => {
        document.title = "Register!"
    }, [])

    return (
        <div className="register-page">
            <div className="register-container">
            <h1>Register</h1>
            <form action="POST">
                Username: <input type="username" id = "username" placeholder="username" onChange={(element) => {setUsername(element.target.value);}}></input>
                Password: <input type="password" id = "password" placeholder="password" onChange={(element) => {setPassword(element.target.value);}}></input>
                <button id = "join-now" onClick={submit}> Join Now </button>
            </form>
            </div>
        </div>
    );
}

export default Register;
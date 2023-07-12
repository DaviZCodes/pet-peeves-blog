import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.scss"

function Register() {
    //useState for username and passwords
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const[cannotRegister, setcannotRegister] = useState("");
    const navigate = useNavigate();

    //waiting for submit button
    async function submit(element: { preventDefault: () => void; }) {
        element.preventDefault();

        try {
            await axios.post("https://pet-peeves-blog-backend.vercel.app", {
                username, password
            })
            navigate("/login");
        }

        catch (error) {
            setcannotRegister("Use another username or password.")
            console.log(error);
        }
    }

    //change tab title
    document.title = "Register!"

    return (
        <div className="register-page">
            <div className="register-container">
            <h1>Register</h1>
            <form action="POST">
                <input type="username" id = "username" placeholder="username" value = {username} onChange={(element) => {setUsername(element.target.value);}}></input>
                <input type="password" id = "password" placeholder="password" value = {password} onChange={(element) => {setPassword(element.target.value);}}></input>
                <button id = "join-now" onClick={submit}> Join Now </button>
            </form>
            <p id = "cannotRegister">{cannotRegister}</p>
            </div>
        </div>
    );
}

export default Register;
import React, {useEffect} from "react";
import "./Register.css"

function Register() {
    useEffect(() => {
        document.title = "Register!"
    }, [])

    return (
        <div className="register-page">
            <div className="register-container">
            <h1>Register</h1>
            Create a Username: <input type="text" id = "create-username"></input>
            <br></br>
            Choose a Password: <input type="text" id = "create-password"></input>
            </div>
        </div>
    );
}

export default Register;
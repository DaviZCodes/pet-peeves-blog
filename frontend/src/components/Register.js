import React, {useEffect} from "react";

function Register() {
    useEffect(() => {
        document.title = "Register!"
    }, [])

    return (
        <div className="register">
            <h1>Register</h1>
        </div>
    );
}

export default Register;
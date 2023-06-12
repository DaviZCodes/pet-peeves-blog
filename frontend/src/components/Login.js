import React, {useEffect} from "react";

function Login() {

    useEffect(() =>{
        document.title = "Login!"
    }, [])

    return (
        <div className="login">
            <h1>Login</h1>
        </div>
    );
}

export default Login;
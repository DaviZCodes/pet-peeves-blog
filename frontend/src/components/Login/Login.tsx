import {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import axios from "axios";
import { UserContext } from "../UserContext/UserContext";

function Login() {

    //useState for username and passwords
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const[wrongPasswordText, setWrongPasswordText] = useState<string>("");
    const navigate = useNavigate();
    const { setUserInfo, userInfo } = useContext(UserContext);

    //waiting for submit button
    async function submit(element: { preventDefault: () => void; }) {
        element.preventDefault();
        try {

            //this "user" and "pass" is only for testing purposes to test the frontend, to actually
            //function, we must use cookie parser from the backend. Delete this after
            if (username === "user" && password == "pass") {
                localStorage.setItem("token", "testing-purposes");
                setUserInfo( username );
                navigate("/");
            }
            //delete above

            const response = await axios.post("https://pet-peeves-blog-backend.vercel.app/login", {
              username,
              password,
            }, {
                withCredentials: true, //allow cookies because of authentication middleware
            });
            setUserInfo(username);
            navigate("/");
        }

        catch (error) { 
            setWrongPasswordText("Wrong username or password.");
            console.log(error);
        }
    }

    //change tab title
    document.title = "Login!"


    //if logged in, automatically go to "/post"
    useEffect(() => {
        if (userInfo){
            navigate("/post");
        }
    }, [userInfo])

    return (
        <div className="login">
            <div className="container">
            <h1 id = "login-text">Login</h1>
            <form action="POST">
                <input type="username" id = "username" placeholder="username" onChange={(element) => {setUsername(element.target.value);}}></input>
                <input type="password" id = "password" placeholder="password" onChange={(element) => {setPassword(element.target.value);}}></input>
                <input type="submit" onClick={submit} id = "submit"></input>
            </form>

            <p id = "wrong-password">{wrongPasswordText}</p>
        
            <Link to = "/register" id = "register">
            <h3 id = "question">Don't have an account?</h3>
            </Link>
            <Link to = "/register" id = "register-text"> Register </Link>

            {/* testing frontend */}
            <br></br>
            <br></br>
            <p style = {{fontSize: 10}}>username: "user" and password: "pass" for frontend testing</p>
            </div>
        </div>
    );
}

export default Login;
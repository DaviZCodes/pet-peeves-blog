import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

function Register() {
  //useState for username and passwords
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [cannotRegister, setcannotRegister] = useState<string>("");
  const navigate = useNavigate();

  //waiting for submit button
  async function submit(element: { preventDefault: () => void }) {
    element.preventDefault();

    try {
      await axios.post("http://localhost:8019/register", {
        username,
        password,
      });
      navigate("/login");
    } catch (error) {
      setcannotRegister("Use another username or password.");
      console.log(error);
    }
  }

  //change tab title
  document.title = "Register!";

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Register</h1>
        <form action="POST">
          <input
            type="username"
            id="username"
            placeholder="username"
            value={username}
            onChange={(element) => {
              setUsername(element.target.value);
            }}
          ></input>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="password"
            value={password}
            onChange={(element) => {
              setPassword(element.target.value);
            }}
          />
          <div
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide password" : "Show password"}
          </div>
          <button id="join-now" onClick={submit}>
            {" "}
            Join Now{" "}
          </button>
        </form>
        <p id="cannotRegister">{cannotRegister}</p>
      </div>
    </div>
  );
}

export default Register;

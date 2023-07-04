import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Post from './components/Post/Post';
import Profile from './components/Profile/Profile';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { UserContextProvider } from './components/UserContext/UserContext';

function App() {
  return (
    <UserContextProvider>
      <Router>
      <div className="App">
        <header className="App-header">
          <NavBar/>
          <Routes>
            <Route path="/" element = {<Home/>} />
            <Route path="/about" element = {<About/>} />
            <Route path="/login" element = {<Login/>} />
            <Route path="/register" element = {<Register/>} />
            <Route path="/post" element = {<Post/>} />
            <Route path="/profile" element = {<Profile/>} />
          </Routes>
        </header>
      </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;

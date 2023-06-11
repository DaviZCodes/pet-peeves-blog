import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <Routes>
          <Route path="/" element = {<Home/>} />
          <Route path="/about" element = {<About/>} />
          <Route path="/login" element = {<Login/>} />
          <Route path="/register" element = {<Register/>} />
        </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;

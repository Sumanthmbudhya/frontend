import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Emp from './components/Emp.jsx';
import Register from './components/Register.jsx';
import Emplist from './components/Emplist.jsx';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Emp" element={<Emp />} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Emplist" element={<Emplist/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

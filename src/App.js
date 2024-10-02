// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Detail from './components/Detail';
import About from './components/About';
import Profile from './components/Profile';
import BoosterPage from './components/BoosterPage'; // Import the new component
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/booster" element={<BoosterPage />} /> {/* Add this line for the new page */}
            <Route path="/detail/:id" component={Detail} /> {/* Define a route for the Detail component */}
            <Route path="/" exact component={BoosterPage} /> {/* Default route for BoosterPage */}
          </Routes>
        </div>

        <nav className="bottom-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/booster">Booster</Link> {/* Add this line for the new page */}
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Admin from './components/Admin';

export default function App() {
  return (
    <Router>
      <div>
        <nav className="nav nav-tabs navbar navbar-expand-lg navbar-light bg-light custom-color-1">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule/:screeningId" element={<Schedule />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

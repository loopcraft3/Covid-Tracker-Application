import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddDataForm from './components/AddDataForm';
import UpdateDataForm from './components/UpdateDataForm';
import DeleteRecord from './components/DeleteRecord';
import TotalCases from './components/TotalCases';
import FilteredData from './components/FilteredData';
import HighCasesDeaths from './components/HighCasesDeaths';
import './AppStyles.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-bar">
          <h1 className="nav-title">COVID Tracker Dashboard</h1>
          <ul className="nav-links">
            <li><Link to="/add">Add</Link></li>
            <li><Link to="/update">Update</Link></li>
            <li><Link to="/delete">Delete</Link></li>
            <li><Link to="/total">Total</Link></li>
            <li><Link to="/filter">Filter</Link></li>
            <li><Link to="/high">High</Link></li>
          </ul>
        </nav>

        <div className="route-content">
          <Routes>
            <Route path="/add" element={<AddDataForm />} />
            <Route path="/update" element={<UpdateDataForm />} />
            <Route path="/delete" element={<DeleteRecord />} />
            <Route path="/total" element={<TotalCases />} />
            <Route path="/filter" element={<FilteredData />} />
            <Route path="/high" element={<HighCasesDeaths />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

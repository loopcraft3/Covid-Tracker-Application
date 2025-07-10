import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import '../AppStyles.css';

const HighCasesDeaths = () => {
  const [casesThreshold, setCasesThreshold] = useState('');
  const [deathsThreshold, setDeathsThreshold] = useState('');
  const [states, setStates] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.get(`/high`, {
        params: {
          cases: casesThreshold,
          deaths: deathsThreshold,
        },
      });
      setStates(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>States With High Cases & Deaths</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Min Cases"
          value={casesThreshold}
          onChange={(e) => setCasesThreshold(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Min Deaths"
          value={deathsThreshold}
          onChange={(e) => setDeathsThreshold(e.target.value)}
          required
        />
        <button type="submit">Get States</button>
      </form>
      {states.length > 0 && (
        <ul className="result-list">
          {states.map((s, idx) => (
            <li key={idx}>
              {s.state} - {s.cases} cases, {s.deaths} deaths
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HighCasesDeaths;

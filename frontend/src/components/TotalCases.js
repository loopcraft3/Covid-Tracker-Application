import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import '../AppStyles.css';

const TotalCases = () => {
  const [state, setState] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosInstance.get(`/total/${state}`);
    setResult(res.data);
  };

  return (
    <div className="form-container">
      <h2>View Total Cases & Deaths</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
        <button type="submit">Fetch</button>
      </form>
      {result && (
      <div className="result-box">
        <p><strong>Cases:</strong> {result.totalCases}</p>
        <p><strong>Deaths:</strong> {result.totalDeaths}</p>
      </div>
        )}

    </div>
  );
};

export default TotalCases;

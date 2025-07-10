import React, { useState } from 'react'; 
import axiosInstance from '../axiosInstance';  // Assuming this is your axios instance
import '../AppStyles.css';

const FilteredData = () => {
  const [state, setState] = useState('');
  const [minDeaths, setMinDeaths] = useState('');
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null); // To handle error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset the error before making the request

    try {
      const res = await axiosInstance.get(`/filter`, {
        params: { state, deaths: minDeaths }
      });

      if (res.data.length === 0) {
        setError('No records found for the given filter.');
      } else {
        setRecords(res.data);
      }
    } catch (err) {
      setError('Error fetching data. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>Filtered Records (Deaths Threshold)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Min Deaths"
          value={minDeaths}
          onChange={(e) => setMinDeaths(e.target.value)}
          required
        />
        <button type="submit">Fetch</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {records.length > 0 && (
        <ul className="result-list">
          {records.map((item, idx) => (
            <li key={idx}>
              {item.state} - {item.deaths} deaths on {new Date(item.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilteredData;

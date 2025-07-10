import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; // Make sure this imports your custom axios instance
import '../AppStyles.css';

const AddDataForm = () => {
  const [formData, setFormData] = useState({
    state: '',
    cases: '',
    deaths: '',
    date: ''
  });
  const [message, setMessage] = useState({ text: '', isError: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send data using axiosInstance
      const response = await axiosInstance.post('/add', formData);
      console.log('Response:', response.data); // For debugging purposes
      setMessage({ text: 'Data added successfully', isError: false });
      
      // Clear form fields after submission 
      setFormData({
        state: '',
        cases: '',
        deaths: '',
        date: ''
      });
    } catch (error) {
      console.error('Error adding data:', error);
      setMessage({ text: error.response?.data?.message || 'There was an error adding the data', isError: true });
    }
  };

  return (
    <div className="form-container">
      <h2>Add COVID Data</h2>
      {message.text && (
        <div className={message.isError ? 'error-message' : 'success-message'}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cases"
          placeholder="Cases"
          value={formData.cases}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="deaths"
          placeholder="Deaths"
          value={formData.deaths}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Data</button>
      </form>
    </div>
  );
};

export default AddDataForm;

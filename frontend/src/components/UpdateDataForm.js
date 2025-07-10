import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import '../AppStyles.css';

const UpdateDataForm = () => {
  const [formData, setFormData] = useState({
    state: '',
    cases: '',
    deaths: '',
    date: ''
  });
  const [message, setMessage] = useState({ text: '', isError: false });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', isError: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message.text]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/update', formData);
      setMessage({ text: 'Data updated successfully', isError: false });
      setFormData({
        state: '',
        cases: '',
        deaths: '',
        date: ''
      });
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Error updating record', isError: true });
    }
  };

  return (
    <div className="form-container">
      <h2>Update COVID Data</h2>
      {message.text && (
        <div className={message.isError ? 'error-message' : 'success-message'}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" name="state" placeholder="State" onChange={handleChange} required />
        <input type="number" name="cases" placeholder="Updated Cases" onChange={handleChange} required />
        <input type="number" name="deaths" placeholder="Updated Deaths" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateDataForm;

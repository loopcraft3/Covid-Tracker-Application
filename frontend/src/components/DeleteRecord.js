import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import '../AppStyles.css';

const DeleteRecord = () => {
  const [state, setState] = useState('');
  const [message, setMessage] = useState({ text: '', isError: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/delete', { state });
      setMessage({ text: 'Record deleted successfully', isError: false });
      setState('');
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Error deleting record', isError: true });
    }
  };

  return (
    <div className="form-container">
      <h2>Delete Record</h2>
      {message.text && (
        <div className={message.isError ? 'error-message' : 'success-message'}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default DeleteRecord;

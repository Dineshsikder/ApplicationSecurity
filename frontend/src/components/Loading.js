import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-content">
        <h2>Loading Application...</h2>
        <div className="spinner"></div>
        <p>Please wait while we initialize the application.</p>
      </div>
    </div>
  );
};

export default Loading; 
import React from 'react';
import { useLocation } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const { image, text } = location.state || {};

  return (
    <div className="page-container">
      <h1 className="page-header">Result Page</h1>
      {image && (
        <div className="page-content">
          <h2>Text Submitted: {text}</h2>
          <img src={image} alt="Generated" />
        </div>
      )}
      <button
        className="button"
        onClick={() => (window.location.href = '/gallery')}
      >
        Go to Gallery
      </button>
    </div>
  );
}

export default ResultPage;
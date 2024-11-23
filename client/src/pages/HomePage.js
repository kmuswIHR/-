import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/process_input', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userInput }),
      });
      const data = await response.json();
      if (data.image_url) {
        navigate('/result', { state: { image: data.image_url, text: userInput } });
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Welcome to Multimedia Diary</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter some text"
        />
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
}

export default HomePage;
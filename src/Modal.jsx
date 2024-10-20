import React, { useState } from 'react';
import './M.css'; // Make sure to create a CSS file for styles
import axios from 'axios';
const ScoreModal = ({ score, onClose, onSave }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSave = () => {
    const res=axios.post('http://localhost:5000/save', {playerName,score})
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">🎮 Game Over! 🎮</h2>
        <p className="modal-score">Your Score: {score}</p>
        <input type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="name-input"
        />
        <div className="modal-buttons">
          <button onClick={handleSave} className="save-button">
            Save Score
          </button>
          <button onClick={onClose} className="exit-button">
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreModal;

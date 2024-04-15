import React from 'react';

function MessagePopup({ showPopup, message, onClose }) {
  if (!showPopup) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <p style={{ color: 'black' }}>{message}</p>
      </div>
      <div className="overlay" onClick={onClose}></div>

      {/* Add some CSS for styling */}
          <style>
              {`
    .popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      color: black; /* Set text color to black */
      border: 1px solid #ccc;
      padding: 20px;
      z-index: 1000;
    }
    .popup-content {
      position: relative;
    }
    .close-btn {
      position: absolute;
      top: 5px;
      right: 10px;
      cursor: pointer;
      background: none;
      border: none;
      font-size: 20px;
      color: black; /* Set close button color to black */
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: white; /* Set background color to white */
      z-index: 999;
    }
  `}
          </style>

    </div>
  );
}

export default MessagePopup;

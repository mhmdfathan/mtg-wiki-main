// src/components/About.js
import React from 'react';
import './About.css'; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About This App</h2>
      <div className="about-info">
        {/* Add information about the application here */}
        <p>This app is designed to showcase Magic: The Gathering cards.</p>
        <p>Feel free to explore the card list, view details, and learn more about each card.</p>
        {/* Add more information as needed */}
      </div>
    </div>
  );
};

export default About;

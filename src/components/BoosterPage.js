import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BoosterPage.css';

const placeholderImageUrl = 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=2232&type=card';

const BoosterPage = () => {
  const [sets, setSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState('');
  const [booster, setBooster] = useState([]);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await axios.get('https://api.magicthegathering.io/v1/sets');
        setSets(response.data.sets);
      } catch (error) {
        console.error('Error fetching sets:', error);
      }
    };

    fetchSets();
  }, []);

  const handleSetChange = (e) => {
    setSelectedSet(e.target.value);
  };

  const handleGenerateBooster = async () => {
    try {
      const response = await axios.get(`https://api.magicthegathering.io/v1/sets/${selectedSet}/booster`);
      setBooster(response.data.cards.slice(0, 12));
    } catch (error) {
      console.error('Error generating booster pack:', error);
    }
  };

  return (
    <div className="booster-page">
      <h2>Booster Pack Generator</h2>
      <label>
        Select a Set:
        <select value={selectedSet} onChange={handleSetChange}>
          <option value="">Select a set</option>
          {sets.map((set) => (
            <option key={set.code} value={set.code}>
              {set.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleGenerateBooster}>Generate Booster Pack</button>

      <div className="booster-card-container-wrapper">
        <div className="booster-card-container">
          {booster.map((card, index) => (
            <div key={index} className="booster-card-item">
              <Link to={`/detail/${card.id}`}>
                <p className="booster-card-title">{card.name}</p>
                <img src={card.imageUrl || placeholderImageUrl} alt={card.name} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoosterPage;

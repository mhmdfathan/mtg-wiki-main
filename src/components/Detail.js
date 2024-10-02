// src/components/Detail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.magicthegathering.io/v1/cards/${id}`);
        setCard(response.data.card);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="detail-booster-page">
      {card ? (
        <div className="detail-card-container-wrapper">
          <div className="detail-card-item">
            <a href={`/detail/${card.id}`}>
              <h2 className="detail-card-title">{card.name}</h2>
            </a>
            <div className="detail-card-image-container">
              <img src={card.imageUrl} alt={card.name} className="detail-card-image" />
            </div>
            <div className="detail-card-description">
              <p>Mana Cost: {card.manaCost}</p>
              <p>CMC: {card.cmc}</p>
              <p>Colors: {card.colors?.join(', ')}</p>
              <p>Color Identity: {card.colorIdentity?.join(', ')}</p>
              <p>Type: {card.type}</p>
              <p>Subtypes: {card.subtypes?.join(', ')}</p>
              <p>Rarity: {card.rarity}</p>
              <p>Set: {card.set}</p>
              <p>Set Name: {card.setName}</p>
              <p>Text: {card.text}</p>
              <p>Artist: {card.artist}</p>
              <p>Number: {card.number}</p>
              <p>Power/Toughness: {card.power}/{card.toughness}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;

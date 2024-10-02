import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Detail.css";

const Detail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.magicthegathering.io/v1/cards/${id}`
        );
        setCard(response.data.card);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const getLegalityClass = (legality) => {
    return legality === "Legal" ? "legal" : "not-legal";
  };

  return (
    <div className="detail-page">
      {card ? (
        <div className="detail-container">
          <div className="detail-card-image">
            <img src={card.imageUrl} alt={card.name} />
          </div>
          <div className="detail-card-info">
            <h1>
              {card.name} {card.manaCost}
            </h1>
            <p className="card-type">{card.type}</p>
            <div className="card-text">
              <p>{card.text}</p>
              {card.flavor && <p className="flavor-text">"{card.flavor}"</p>}
            </div>
            <div className="card-stats">
              {card.power && card.toughness && (
                <p>
                  Power/Toughness: {card.power}/{card.toughness}
                </p>
              )}
              <p>Illustrated by {card.artist}</p>
            </div>
            <div className="set-info">
              <p>
                {card.setName} ({card.set}) • {card.rarity} #{card.number}
              </p>
            </div>
            <div className="legalities">
              <h3>Legalities</h3>
              <div className="legality-grid">
                <span className={getLegalityClass(card.legalities?.standard)}>
                  Standard
                </span>
                <span className={getLegalityClass(card.legalities?.pioneer)}>
                  Pioneer
                </span>
                <span className={getLegalityClass(card.legalities?.modern)}>
                  Modern
                </span>
                <span className={getLegalityClass(card.legalities?.legacy)}>
                  Legacy
                </span>
                <span className={getLegalityClass(card.legalities?.vintage)}>
                  Vintage
                </span>
                <span className={getLegalityClass(card.legalities?.commander)}>
                  Commander
                </span>
                <span className={getLegalityClass(card.legalities?.pauper)}>
                  Pauper
                </span>
              </div>
            </div>
            <div className="pricing">
              <h3>Pricing</h3>
              <ul>
                <li>TCGplayer: ${(Math.random() * 10).toFixed(2)}</li>
                <li>Cardmarket: €{(Math.random() * 8).toFixed(2)}</li>
              </ul>
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const placeholderImageUrl = 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=2232&type=card';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    cmc: '',
    types: '',
    subtypes: '',
  });

  const { types, subtypes } = filterCriteria;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.magicthegathering.io/v1/cards');

        const uniqueCards = Array.from(new Map(response.data.cards.map((card) => [card.name, card])).values());

        const cardsWithImages = uniqueCards.filter((card) => card.imageUrl);

        setCards(cardsWithImages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    const filtered = cards.filter((card) => {
      const cmcMatch = filterCriteria.cmc === '' || card.cmc === parseInt(filterCriteria.cmc, 10);
      const typesMatch = types === '' || (card.types && card.types.includes(types));
      const subtypesMatch =
        !['Instant', 'Sorcery', 'Enchantment'].includes(types) ||
        (subtypes === '' || (card.subtypes && card.subtypes.includes(subtypes)));

      return cmcMatch && typesMatch && subtypesMatch;
    });

    setFilteredCards(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <div>
      <h2>Card List</h2>

      <form onSubmit={handleFilterSubmit}>
        <label>
          Converted Mana Cost (CMC):
          <input type="number" name="cmc" value={filterCriteria.cmc} onChange={handleInputChange} />
        </label>
        <label>
          Types:
          <select name="types" value={types} onChange={handleInputChange}>
            <option value="">Any</option>
            {[...new Set(cards.flatMap((card) => card.types || []))].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        {['Instant', 'Sorcery', 'Enchantment'].includes(types) ? null : (
          <label>
            Subtypes:
            <select name="subtypes" value={subtypes} onChange={handleInputChange}>
              <option value="">Any</option>
              {[...new Set(cards.flatMap((card) => card.subtypes || []))].map((subtype, index) => (
                <option key={index} value={subtype}>
                  {subtype}
                </option>
              ))}
            </select>
          </label>
        )}
        <button type="submit">Apply Filters</button>
      </form>

      <ul className="home-card-list">
        {(filteredCards.length > 0 ? filteredCards : cards).map((card) => (
          <li key={card.id} className="home-card-item">
            <Link to={`/detail/${card.id}`} className="home-card-link">
              <div className="home-card-container">
                <p className="home-card-name">{card.name}</p>
                <img
                  src={card.imageUrl || placeholderImageUrl}
                  alt={card.name}
                  className="home-card-image"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

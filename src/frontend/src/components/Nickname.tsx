import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Nickname = () => {
  const [nickname, setNickname] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [difficulties, setDifficulties] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    // Načítame možné hodnoty pre náročnosť a tému z backendu
    axios.get('http://localhost:8080/difficulties')
    .then(response => setDifficulties(response.data))
    .catch(error => console.error("Chyba pri načítaní náročnosti:", error));

    axios.get('http://localhost:8080/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Chyba pri načítaní kategórií:', error));
  }, []);

  const handleStartQuiz = () => {
    if (!nickname.trim() || !difficulty || !category) {
      setError('Prosím, vyplnte všechny pole!');
      return; 
    }
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('difficulty', difficulty);
    localStorage.setItem('category', category);
    navigate('/Question');
  };

  return (
    <div>
      <h1>Napiš svou přezdívku</h1>
      <input
        type="text"
        placeholder="Tvoje přezdívka"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="">Vyber náročnost</option>
        {difficulties.map((difficulty) => (
          <option key={difficulty} value={difficulty}>
            {difficulty}
          </option>
        ))}
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Vyber téma</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <button className = "retro-btn" onClick={handleStartQuiz}>Začít kvíz</button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Nickname;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Winner = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/top10')
      .then(response => {
        setPlayers(response.data);

      })
      .catch(error => {
        console.error('Chyba při načítání hráčů:', error);
      });
  }, []);

  return (
    <div>
      <h1>Top 10 hráčů</h1>
      <table>
        <thead>
          <tr>
            <th>Přezdívka</th>
            <th>Skóre</th>
            <th>Téma</th>
            <th>Náročnost</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.nickname}</td>
              <td>{player.score}</td>
              <td>{player.category}</td>
              <td>{player.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Winner;

import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Winner = () => {
  const [nickname, setNickname] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    const storedScore = localStorage.getItem('score');

    if (storedNickname) {
      setNickname(storedNickname);
    }
    if (storedScore) {
      setScore(parseInt(storedScore, 10));
    }
  }, []);

  const getBodText = (score: number) => {
    if (score === 1) {
      return 'bod';
    } else if (score >= 2 && score <= 4) {
      return 'body';
    } else {
      return 'bodů';
    }
  };
  

  return (
    <div>
      <h1>Gratulujeme, {nickname}!</h1>
      <h2>Dosiáhl jsi {score} {getBodText(score)}!</h2>
      <Link to="/Nickname">
        <Button className = "retro-btn">
            Hrát znovu
        </Button>
      </Link>
      <div>
        <Link to="/Winner">
          <Button className = "retro-btn">
            Žebříček
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Winner;

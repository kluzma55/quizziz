import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Winner = () => {
  const [nickname, setNickname] = useState('');
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const audio = new Audio('/Old victory sound roblox.mp3');

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

  const getBodText = (storedScore: number) => {
    if (storedScore === 1) return 'bod';
    if (storedScore >= 2 && storedScore <= 4) return 'body';
    return 'bodů';
  };

  const handleReveal = () => {
    audio.play();
    setRevealed(true);
  };

  return (
      <div>
      {!revealed ? (
        <div>
          <h1>Konec kvízu</h1>
          <Button className="retro-btn" onClick={handleReveal}>
          Klikni pro odhalení skóre!
        </Button>
        </div>
      ) : (
        <div>
          <h1>Gratulujeme, {nickname}!</h1>
          <h2>Dosáhl/a jsi {score} {getBodText(score)}!</h2>

          <Box className="button-row">
                <Link to="/Nickname">
                    <Button className="retro-btn">
                      Hrát znovu
                    </Button>
                </Link>
                <Link to="/Winner">
                    <Button className="retro-btn">
                      Žebříček
                    </Button>
                </Link>
            </Box>
          </div>
      )}
    </div>
  );
};

export default Winner;

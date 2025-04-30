import { Box, Button, } from '@mui/material';
import {Link} from "react-router-dom"
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Image from '../assets/osu_logo2.png';


const Home = (props: any) => {
  return (
    <div className="centered-container">
        <div className="home-content">
            <h1>Pojďte si záhrát kvíz!</h1>
            <div className="intro-row">
            <div className="intro-left">
                <h2>
                Tento kvíz byl vytvořen dvěma žákyněmi jako semestrální projekt.
                Doufáme, že si tento kvíz užijete.
                </h2>
            </div>
            <div className="intro-right">
                <img src={Image} alt="Quiz intro" />
            </div>
            </div>
            <p>
            Otestuj své znalosti. Po dokončení kvízu uvidíš své skóre a žebříček nejlepších hráčů.
            </p>
            <Box className="button-row">
                <Link to="/Nickname">
                    <Button className="retro-btn">Otestuj své znalosti</Button>
                </Link>
                <Link to="/Winner">
                    <Button className="retro-btn">Žebříček</Button>
                </Link>
            </Box>
        </div>
        </div>

  );
};

export default Home

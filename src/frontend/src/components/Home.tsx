import { Box, Button, } from '@mui/material';
import {Link} from "react-router-dom"
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = (props: any) => {
  return (
    <div>
        <h1>
            Pojďte si záhrát kvíz!
        </h1>
        <h2>
            Tento kvíz byl vytvořen dvěma žákyněmi jako semstrální projekt.
            Doufáme, že si tento kvíz užijete.
        </h2>
        <p>
            Otestuj své znalosti. Po dokončení kvízu uvidíš své skóre a žebříček nejlepších hráčů.
        </p>
        <Box>
            <Link to="/Nickname">
            <Button className = "retro-btn">
                Otestuj své znalosti
            </Button>
            </Link>
            <div>
            <Link to="/Winner">
            <Button className = "retro-btn">
                Žebříček
            </Button>
            </Link>
            </div>
        </Box>
    </div>
  );
};

export default Home

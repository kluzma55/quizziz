import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Nickname = (props:any) => {
    const [nickname, setNickname] = useState('');
    const score = localStorage.getItem('score') || 0;
    const navigate = useNavigate();
  return (
    <div>
      <h1>
        Napiš svou přezdívku
      </h1>
      <h2>
        pod touto přezdívkou bude reprezentováno tvé skóre v žebříčku nejlepších hráčů.
      </h2>
      <div>
        
      </div>
    </div>
  )
}

export default Nickname

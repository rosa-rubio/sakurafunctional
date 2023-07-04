import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Back from '../../assets/back.svg';
import Stellar from '../../assets/Stellar Journey.svg';
import Start from '../../assets/favorite.svg';

export default function Header() {
  const location = useLocation();
  const [showBackImage, setShowBackImage] = useState(false);

  useEffect(() => {
    if (location.pathname === '/Favorites') {
      setShowBackImage(true);
    } else {
      setShowBackImage(false);
    }
  }, [location.pathname]);

  return (
    <div className='header'>
      {showBackImage && (
        <Link to="/Main">
          <img src={Back} className='btn-back' alt='Boton que regresa a las cartas'/>
        </Link>
      )}
      <nav className='navegation'>
        <Link to="/*" className='back-Intro'><img src={Stellar} alt='Logo'/></Link>
        <Link to="/Favorites"><img src={Start} alt='star for favorites'/></Link> 
      </nav>   
    </div>
  );
}


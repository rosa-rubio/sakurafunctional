
import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';


function Button() {
  return (
    <Link to="/Main" className="botonDestino">
      <div className="cajaTexto">Saber mi destino</div>
    </Link>
  );
}


export default Button;

// src/componentes/VistaPrincipal.jsx
import React from 'react';
import Tragaperras from './Tragaperras'; // Este lo veremos luego

const VistaPrincipal = ({ volverAlMenu }) => {
  return (
    <div>
      <h2>Vista Principal</h2>
      <Tragaperras />
      <button onClick={volverAlMenu}>Volver al Menú</button>
    </div>
  );
};

export default VistaPrincipal;

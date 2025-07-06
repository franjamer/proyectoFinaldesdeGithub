// src/componentes/MenuPrincipal.jsx
import React from 'react';

const MenuPrincipal = ({ irAVista }) => {
  return (
    <div>
      <h1>Menú Principal</h1>
      <button onClick={() => irAVista('principal')}>Vista Principal</button>
      <button onClick={() => irAVista('config')}>Configuración</button>
    </div>
  );
};

export default MenuPrincipal;

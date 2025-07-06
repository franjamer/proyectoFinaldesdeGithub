import React from 'react';

const ControlesTragaperras = ({ onGirarTodos, desactivado }) => {
  return (
    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
      <button onClick={onGirarTodos} disabled={desactivado}>
        Girar Todos
      </button>
    </div>
  );
};

export default ControlesTragaperras;

// src/componentes/Apuesta.jsx
import React from 'react';

export default function Apuesta({ apuesta, setApuesta, saldo, disabled }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label>
        Apuesta:
        <input
          type="number"
          min="1"
          value={apuesta}
          onChange={(e) => setApuesta(Number(e.target.value))}
          disabled={disabled}
          style={{ marginLeft: '10px', width: '80px' }}
        />
      </label>
      <p>Saldo: {saldo} monedas</p>
    </div>
  );
}

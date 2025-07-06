import React from 'react';

const Slot = ({ imagen, girando, onAvanzar, index, premio }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: '4rem',
          border: '4px solid #333',
          padding: '1rem',
          width: '100px',
          height: '100px',
          lineHeight: '100px',
          borderRadius: '1rem',
          background: premio ? 'gold' : '',
          boxShadow: premio
            ? '0 0 20px 10px ' + (premio.includes('4') ? 'red' : 'blue')
            : '',
          transition: 'all 0.4s ease',
        }}
      >
        {imagen}
      </div>
      <button onClick={onAvanzar} disabled={girando} style={{ marginTop: '0.5rem' }}>
        Avanzar Slot {index + 1}
      </button>
    </div>
  );
};

export default Slot;

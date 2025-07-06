import React from 'react';

const PanelPuntuacion = ({ puntuacion, premio }) => {
  return (
    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
      {puntuacion !== null && (
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          🎯 Puntos conseguidos: {puntuacion}
        </div>
      )}
      {premio && (
        <div style={{ marginTop: '1rem', fontSize: '2rem', color: 'darkgreen' }}>
          {premio}
        </div>
      )}
    </div>
  );
};

export default PanelPuntuacion;

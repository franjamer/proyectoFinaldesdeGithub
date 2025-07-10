// src/componentes/TablaHistorial.jsx
import React from 'react';
import imagenes from '../utils/imagenes.mjs';

const mapaEmojis = Object.fromEntries(imagenes.map(img => [img.nombre, img.emoji]));
export default function TablaHistorial({ historial }) {
  return (
    <table border="1" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Combinación</th>
          <th>Valor Tirada</th>
          <th>Multiplicador</th>
          <th>Premio</th>
        </tr>
      </thead>
      <tbody>
  {historial.map((jugada, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{jugada.combinacion.map(nombre => mapaEmojis[nombre] || nombre).join(' - ')}</td>
      <td>{jugada.valorTirada}</td>
      <td>x{jugada.multiplicador}</td>
      <td>{jugada.premio}</td>
    </tr>
  ))}
</tbody>
    </table>
  );
}

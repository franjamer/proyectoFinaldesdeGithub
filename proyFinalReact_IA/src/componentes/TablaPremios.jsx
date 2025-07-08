// src/componentes/TablaPremios.jsx
import React from 'react';

export default function TablaPremios() {
  return (
    <table border="1" style={{ width: '100%', marginTop: '10px' }}>
      <thead>
        <tr>
          <th>Combinación</th>
          <th>Multiplicador</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>4 iguales</td><td>x10</td></tr>
        <tr><td>3 iguales</td><td>x5</td></tr>
        <tr><td>2 parejas</td><td>x2</td></tr>
        <tr><td>1 pareja</td><td>x1.25</td></tr>
        <tr><td>Sin premio</td><td>x0</td></tr>
      </tbody>
    </table>
  );
}

// App.jsx
import React, { useState } from 'react';
import MenuPrincipal from './componentes/MenuPrincipal';
import VistaPrincipal from './componentes/VistaPrincipal';

function App() {
  const [vista, setVista] = useState('menu'); // 'menu' | 'principal' | 'config'

  return (
    <div>
      {vista === 'menu' && (
        <MenuPrincipal irAVista={(nuevaVista) => setVista(nuevaVista)} />
      )}

      {vista === 'principal' && (
        <VistaPrincipal volverAlMenu={() => setVista('menu')} />
      )}

      {vista === 'config' && (
        <div>
          <h2>Configuración (en desarrollo)</h2>
          <button onClick={() => setVista('menu')}>Volver al Menú</button>
        </div>
      )}
    </div>
  );
}

export default App;

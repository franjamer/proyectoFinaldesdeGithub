// src/componentes/Tragaperras.jsx
import React, { useState, useRef, useEffect } from 'react';
import Slot from './Slot';
import Apuesta from './Apuesta';
import TablaHistorial from './TablaHistorial';
import TablaPremios from './TablaPremios';
import imagenes from '../utils/imagenes';
import { calcularMultiplicador,obtenerValor } from '../utils/combinaciones';

export default function Tragaperras() {
  const [slots, setSlots] = useState([0, 0, 0, 0].map(() => crearSlotInicial()));
  const [mensaje, setMensaje] = useState(null);
  const [apuesta, setApuesta] = useState(0);
  const [saldo, setSaldo] = useState(10);
  const [historial, setHistorial] = useState([]);

  const intervalos = useRef([]);

  function crearSlotInicial() {
    return {
      nombre: imagenes[Math.floor(Math.random() * imagenes.length)].nombre,
      girando: false,
    };
  }

  const handleJugar = () => {
    if (apuesta <= 0 || apuesta > saldo) return;

    setMensaje(null);
    setSaldo(prev => prev - apuesta);
    setSlots(prev => prev.map(s => ({ ...s, girando: true })));

    const combinacionFinal = [];
    const nuevasSlots = [...slots];

    nuevasSlots.forEach((_, i) => {
      intervalos.current[i] = setInterval(() => {
        setSlots(prev => {
          const nuevos = [...prev];
          nuevos[i] = {
            ...nuevos[i],
            nombre: imagenes[Math.floor(Math.random() * imagenes.length)].nombre,
          };
          return nuevos;
        });
      }, 100);
    });

    const duraciones = [1000, 1200, 1400, 1600].map(ms => ms + Math.random() * 300);

    duraciones.forEach((duracion, i) => {
      setTimeout(() => {
        clearInterval(intervalos.current[i]);

        const nombreFinal = imagenes[Math.floor(Math.random() * imagenes.length)].nombre;
        combinacionFinal[i] = nombreFinal;

        setSlots(prev => {
          const nuevos = [...prev];
          nuevos[i] = { nombre: nombreFinal, girando: false };
          return nuevos;
        });

        if (combinacionFinal.filter(Boolean).length === 4) {
          // 🔢 Calcular el valor total de la tirada (suma de valores de las figuras)
          const valorTirada = combinacionFinal.reduce((acum, nombre) => {
  return acum + obtenerValor(nombre);
}, 0);


          const resultado = calcularMultiplicador(combinacionFinal);
          const premio = valorTirada * resultado.multiplicador;

          setSaldo(prev => prev + premio);
          setMensaje(`${resultado.mensaje} | Ganancia: ${premio} (Valor: ${valorTirada} x ${resultado.multiplicador})`);

          setHistorial(prev => [
            {
              combinacion: combinacionFinal,
              valorTirada,
              multiplicador: resultado.multiplicador,
              premio,
            },
            ...prev.slice(0, 9),
          ]);
        }
      }, duracion);
    });
  };

  useEffect(() => {
    return () => {
      intervalos.current.forEach(id => clearInterval(id));
    };
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🎰 Tragaperras React</h1>

      <Apuesta apuesta={apuesta} setApuesta={setApuesta} saldo={saldo} disabled={false} />

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
        {slots.map((s, i) => (
          <Slot
            key={i}
            imagen={s.nombre}
            girando={s.girando}
            premio={mensaje}
            onAvanzar={() => {}}
            index={i}
          />
        ))}
      </div>

      {mensaje && <p style={{ color: 'green', fontWeight: 'bold' }}>{mensaje}</p>}

      <button
        onClick={handleJugar}
        disabled={apuesta <= 0 || apuesta > saldo || slots.some(s => s.girando)}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Jugar
      </button>

      <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
        <div style={{ flex: 1 }}>
          <h3>📜 Historial</h3>
          <TablaHistorial historial={historial} />
        </div>
        <div style={{ flex: 1 }}>
          <h3>🏆 Premios</h3>
          <TablaPremios />
        </div>
      </div>
    </div>
  );
}

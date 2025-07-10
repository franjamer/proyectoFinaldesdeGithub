// src/componentes/Tragaperras.jsx
import React, { useState, useRef, useEffect } from 'react';
import Slot from './Slot.jsx';
import Apuesta from './Apuesta.jsx';
import TablaHistorial from './TablaHistorial.jsx';
import TablaPremios from './TablaPremios.jsx';
import imagenes from '../utils/imagenes.mjs';
import { calcularMultiplicador, obtenerValor } from '../utils/combinaciones.mjs';

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
          evaluarCombinacion(combinacionFinal);
        }
      }, duracion);
    });
  };

  const evaluarCombinacion = (combinacion) => {
    const resultado = calcularMultiplicador(combinacion);
    const figurasGanadoras = resultado.figurasGanadoras || [];

    const valorGanador = figurasGanadoras.reduce((acum, nombre) => {
      return acum + obtenerValor(nombre);
    }, 0);

    const premio = valorGanador * resultado.multiplicador;

    setSaldo(prev => prev + premio);
    setMensaje(
      `${resultado.mensaje} | Ganancia: ${premio} (Valor figuras ganadoras: ${valorGanador} x ${resultado.multiplicador})`
    );

    setHistorial(prev => [
      {
        combinacion,
        valorTirada: valorGanador,
        multiplicador: resultado.multiplicador,
        premio,
      },
      ...prev.slice(0, 9),
    ]);
  };

  const handleAvanzarSlot = (index) => {
    if (apuesta <= 0 || apuesta > saldo || slots[index].girando) return;

    setSaldo(prev => prev - apuesta);
    const nuevoNombre = imagenes[Math.floor(Math.random() * imagenes.length)].nombre;

    const nuevaCombinacion = slots.map((slot, i) =>
      i === index ? { nombre: nuevoNombre, girando: false } : slot
    );

    setSlots(nuevaCombinacion);
    evaluarCombinacion(nuevaCombinacion.map(s => s.nombre));
  };

  useEffect(() => {
    return () => {
      intervalos.current.forEach(id => clearInterval(id));
    };
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🎰 Tragaperras Virtual</h1>

      <Apuesta apuesta={apuesta} setApuesta={setApuesta} saldo={saldo} disabled={false} />

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
        {slots.map((s, i) => (
          <Slot
            key={i}
            imagen={s.nombre}
            girando={s.girando}
            premio={mensaje}
            onAvanzar={() => handleAvanzarSlot(i)}
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

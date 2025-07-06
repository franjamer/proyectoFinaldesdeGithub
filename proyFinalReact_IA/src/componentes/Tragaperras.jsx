import React, { useState, useRef, useEffect } from 'react';

///////////////////////
// 🔹 Configuración
///////////////////////
const imagenes = [
  { simbolo: '🍒', valor: 10 },
  { simbolo: '🍋', valor: 20 },
  { simbolo: '🍊', valor: 15 },
  { simbolo: '🍇', valor: 25 },
  { simbolo: '💎', valor: 50 },
  { simbolo: '⭐', valor: 30 },
];

const crearSlotInicial = () => ({
  imagenIndex: Math.floor(Math.random() * imagenes.length),
  girando: false,
});

///////////////////////
// 🔹 Componentes auxiliares
///////////////////////
const Slot = ({ imagen, girando, onAvanzar, premio }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{
      fontSize: '3rem',
      border: '2px solid #333',
      padding: '1rem',
      width: '4rem',
      height: '4rem',
      marginBottom: '0.5rem',
      backgroundColor: girando ? '#ccc' : '#fff',
    }}>
      {imagen}
    </div>
    <button onClick={onAvanzar} disabled={girando || premio}>
      ➡️
    </button>
  </div>
);

const ControlesTragaperras = ({ onGirarTodos, desactivado }) => (
  <div style={{ marginTop: '1rem' }}>
    <button onClick={onGirarTodos} disabled={desactivado}>
      🎰 Girar Todos
    </button>
  </div>
);

const PanelPuntuacion = ({ puntuacion, premio }) => (
  <div style={{ marginTop: '2rem' }}>
    {puntuacion !== null && <h3>Puntuación: {puntuacion}</h3>}
    {premio && <h2 style={{ color: 'green' }}>{premio}</h2>}
  </div>
);

///////////////////////
// 🔹 Componente principal
///////////////////////
const Tragaperras = () => {
  const [slots, setSlots] = useState(Array(4).fill(null).map(crearSlotInicial));
  const [puntuacion, setPuntuacion] = useState(null);
  const [premio, setPremio] = useState(null);
  const intervalosRef = useRef([]);

  const calcularPuntos = (nuevoSlots = slots) => {
    const total = nuevoSlots.reduce(
      (suma, slot) => suma + imagenes[slot.imagenIndex].valor,
      0
    );
    setPuntuacion(total);

    const simbolos = nuevoSlots.map(slot => imagenes[slot.imagenIndex].simbolo);
    const contador = {};
    simbolos.forEach(s => (contador[s] = (contador[s] || 0) + 1));

    const coincidencias = Math.max(...Object.values(contador));
    if (coincidencias === 4) {
      setPremio('🎉 ¡JACKPOT! 4 símbolos iguales 🎉');
    } else if (coincidencias === 3) {
      setPremio('✨ ¡Buen premio! 3 símbolos iguales ✨');
    } else {
      setPremio(null);
    }
  };

  const avanzarUno = (i) => {
    setSlots(prev => {
      const nuevos = [...prev];
      nuevos[i].imagenIndex = (nuevos[i].imagenIndex + 1) % imagenes.length;
      calcularPuntos(nuevos);
      return nuevos;
    });
  };

  const girarTodos = () => {
    setPuntuacion(null);
    setPremio(null);

    slots.forEach((_, i) => {
      if (slots[i].girando) return;

      const duracion = Math.floor(Math.random() * 2000) + 1000;
      intervalosRef.current[i] = setInterval(() => {
        setSlots(prev =>
          prev.map((slot, j) => {
            if (j === i) {
              const nuevoIndex = Math.floor(Math.random() * imagenes.length);
              return { ...slot, imagenIndex: nuevoIndex };
            }
            return slot;
          })
        );
      }, 100);

      setSlots(prev => prev.map((slot, j) =>
        j === i ? { ...slot, girando: true } : slot
      ));

      setTimeout(() => {
        clearInterval(intervalosRef.current[i]);
        setSlots(prev => {
          const nuevos = prev.map((slot, j) =>
            j === i ? { ...slot, girando: false } : slot
          );
          if (nuevos.every(s => !s.girando)) calcularPuntos(nuevos);
          return nuevos;
        });
      }, duracion);
    });
  };

  useEffect(() => {
    return () => intervalosRef.current.forEach(clearInterval);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Tragaperras</h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        {slots.map((slot, i) => (
          <Slot
            key={i}
            imagen={imagenes[slot.imagenIndex].simbolo}
            girando={slot.girando}
            onAvanzar={() => avanzarUno(i)}
            premio={premio}
          />
        ))}
      </div>

      <ControlesTragaperras
        onGirarTodos={girarTodos}
        desactivado={slots.some((s) => s.girando)}
      />

      <PanelPuntuacion puntuacion={puntuacion} premio={premio} />
    </div>
  );
};

export default Tragaperras;

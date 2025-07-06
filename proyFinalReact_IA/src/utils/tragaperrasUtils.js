import imagenes from './imagenes.js';

export const crearSlotInicial = () => ({
  imagenIndex: Math.floor(Math.random() * imagenes.length),
  girando: false,
});

export const calcularPuntos = (slots) => {
  const total = slots.reduce(
    (suma, slot) => suma + imagenes[slot.imagenIndex].valor,
    0
  );

  const simbolos = slots.map(slot => imagenes[slot.imagenIndex].simbolo);
  const contador = {};
  simbolos.forEach(s => (contador[s] = (contador[s] || 0) + 1));

  const coincidencias = Math.max(...Object.values(contador));
  let premio = null;

  if (coincidencias === 4) {
    premio = '🎉 ¡JACKPOT! 4 símbolos iguales 🎉';
  } else if (coincidencias === 3) {
    premio = '✨ ¡Buen premio! 3 símbolos iguales ✨';
  }

  return { puntuacion: total, premio };
};

const imagenes = require('./imagenes'); // importar el array de objetos con nombre, emoji y valor

function obtenerValor(nombre) {
  const figura = imagenes.find(f => f.nombre === nombre);
  return figura ? figura.valor : 0;
}

function calcularMultiplicador(combinacion) {
  // Contar frecuencia de cada figura
  const counts = {};
  combinacion.forEach((figura) => {
    counts[figura] = (counts[figura] || 0) + 1;
  });

  const figuras = Object.keys(counts);
  const frecuencias = Object.values(counts).sort((a, b) => b - a);

  // Buscar 4 iguales
  if (frecuencias[0] === 4) {
    const figura4 = figuras.find(f => counts[f] === 4);
    const valor = obtenerValor(figura4);
    return {
      multiplicador: 4,
      mensaje: `¡Cuatro ${figura4}s! 🔥`,
    };
  }

  // Buscar 3 iguales
  if (frecuencias[0] === 3) {
    const figura3 = figuras.find(f => counts[f] === 3);
    const valor = obtenerValor(figura3);
    return {
      multiplicador: 3,
      mensaje: `¡Tres ${figura3}s! 💥`,
    };
  }

  // Dos parejas
  const parejas = figuras.filter(f => counts[f] === 2);
  if (parejas.length === 2) {
    return {
      multiplicador: 2,
      mensaje: `¡Dos parejas: ${parejas[0]} y ${parejas[1]}! 🎉`,
    };
  }

  // Una pareja
  if (parejas.length === 1) {
    return {
      multiplicador: 1.25,
      mensaje: `¡Una pareja de ${parejas[0]}! 🎉`,
    };
  }

  // Sin premio
  return {
    multiplicador: 0,
    mensaje: 'Sin premio 😢',
  };
}

module.exports = {
  calcularMultiplicador,
  obtenerValor,
};

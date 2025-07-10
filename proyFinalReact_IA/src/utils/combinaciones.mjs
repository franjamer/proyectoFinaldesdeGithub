// src/utils/combinaciones.js
import imagenes from './imagenes.mjs';



// Devuelve el valor de una figura según su nombre
function obtenerValor(nombre) {
  const figura = imagenes.find(f => f.nombre === nombre);
  return figura ? figura.valor : 0;
}

// Calcula el multiplicador, mensaje y las figuras que forman la combinación ganadora
function calcularMultiplicador(combinacion) {
  const cuenta = {};

  // Contamos cuántas veces aparece cada figura
  combinacion.forEach(nombre => {
    cuenta[nombre] = (cuenta[nombre] || 0) + 1;
  });

  let mensaje = 'Sin premio';
  let multiplicador = 1;
  let figurasGanadoras = [];

  for (const [nombre, cantidad] of Object.entries(cuenta)) {
    if (cantidad === 4) {
      mensaje = `¡Jackpot! Cuatro ${nombre}s`;
      multiplicador = 10;
      figurasGanadoras = Array(4).fill(nombre);
      break;
    } else if (cantidad === 3) {
      mensaje = `¡Triple! Tres ${nombre}s`;
      multiplicador = 5;
      figurasGanadoras = Array(3).fill(nombre);
      break;
    } else if (cantidad === 2) {
      mensaje = `Doble ${nombre}`;
      multiplicador = 2;
      figurasGanadoras = Array(2).fill(nombre);
      // No hay break aquí porque si luego se encuentra una mejor, la sobrescribe
    }
  }

  return {
    multiplicador,
    mensaje,
    figurasGanadoras
  };
}

export { calcularMultiplicador, obtenerValor };

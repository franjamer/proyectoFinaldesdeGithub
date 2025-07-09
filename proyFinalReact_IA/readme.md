# 🎰 Tragaperras React

Este es un proyecto de una **Tragaperras** implementada en React. La aplicación simula un juego de slots donde el usuario puede apostar, girar los rodillos, y ganar premios según las combinaciones obtenidas.

---

## 📋 Descripción

La aplicación consta de 4 slots que giran aleatoriamente durante un tiempo variable. Cuando se detienen, se evalúa la combinación obtenida y se calcula un premio según el valor y multiplicador asignados a cada figura.

La interfaz muestra:

- Los rodillos con sus imágenes (simbolizadas con emojis).
- Un input para realizar apuestas.
- Un botón para jugar.
- Un historial con las últimas combinaciones y premios.
- Una tabla de premios para referencia.

---

## ⚙️ Estructura principal

- **Tragaperras.jsx**: Componente principal que maneja la lógica del juego, estados y eventos.
- **imagenes.js**: Lista de imágenes/símbolos con nombre, emoji y valor.
- **combinaciones.js**: Función para calcular multiplicadores basados en las combinaciones obtenidas.
- **Slot.jsx**: Componente que representa cada rodillo individual.
- **Apuesta.jsx**: Componente para manejar la entrada de la apuesta del usuario.
- **TablaHistorial.jsx** y **TablaPremios.jsx**: Componentes para mostrar la información de premios y el historial de tiradas.

---

## 🕹️ Reglas del juego

- El jugador empieza con un saldo inicial (ejemplo: 10 monedas).
- Puede apostar una cantidad que no supere el saldo disponible.
- Al pulsar "Jugar", los 4 slots giran de forma aleatoria durante tiempos ligeramente diferentes.
- Cuando los slots se detienen, se evalúa la combinación de figuras obtenidas.
- Según la combinación, se calcula un multiplicador y se obtiene una ganancia:
  - 4 figuras iguales: multiplicador = valor figura * 4
  - 3 figuras iguales: multiplicador = valor figura * 3
  - 2 parejas (dos figuras con frecuencia 2): suma de valores de ambas parejas multiplicado por 2
  - 1 pareja: multiplicador = valor figura * 1.25
  - Sin combinación premiada: sin premio (multiplicador 0)
- La ganancia se añade al saldo y se muestra un mensaje con el resultado.
- El historial mantiene las últimas 10 tiradas con su información.

---

## 🛠️ Cómo usar

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repositorio.git



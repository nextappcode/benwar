# BenWar - Juego de Mecanografía Espacial

BenWar es un juego web de mecanografía donde debes destruir naves enemigas escribiendo correctamente las palabras que aparecen en pantalla. ¡Mejora tu velocidad y precisión mientras te diviertes en una batalla espacial!

## Características
- Palabras en español e inglés (archivos en `/words`)
- Música y sonidos de fondo
- Diferentes niveles de dificultad
- Interfaz responsiva para móviles y escritorio
- Efectos visuales y animaciones
- Estadísticas de puntuación, nivel y errores

## ¿Cómo jugar?
1. Ingresa tu nombre en la pantalla principal y haz clic en "Comenzar Batalla".
2. Las naves enemigas descenderán con una palabra encima.
3. Escribe la palabra correctamente y presiona Enter para destruir la nave.
4. No dejes que las naves lleguen a tu nave.
5. Sube de nivel y aumenta la velocidad de las palabras.
6. Si pierdes todas las vidas, ¡el juego termina!

## Controles
- Escribe en el campo de texto para destruir naves.
- Usa el botón "Pausa" o la tecla `Escape` para pausar/reanudar.
- Usa el botón "Reiniciar" para volver a empezar.

## Instalación y ejecución

### Requisitos
- Node.js (recomendado v16+)
- npm (v8+)

### Pasos
1. Clona este repositorio o descarga el código fuente.
2. Instala las dependencias:
   ```bash
   npm install -g http-server
   ```
3. Inicia el servidor en la raíz del proyecto:
   ```bash
   http-server -c-1
   ```
4. Abre tu navegador en [http://localhost:8080](http://localhost:8080) (o el puerto indicado).

### Archivos importantes
- `index.html`: Estructura principal del juego.
- `src/style.css`: Estilos y responsividad.
- `src/game.js`: Lógica principal del juego.
- `src/main.js`: Inicialización y eventos globales.
- `music/` y `sounds/`: Archivos de audio.
- `words/`: Listas de palabras en español e inglés.

## Créditos
- Desarrollado por NextAppCode
- Mejorado con IA
- Música y sonidos libres de derechos o de uso educativo

## Licencia
Este proyecto es solo para fines educativos y personales. No está permitido su uso comercial sin autorización.

---
¡Disfruta y mejora tu velocidad de escritura con BenWar! 🚀 
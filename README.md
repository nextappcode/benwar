# BenWar

¡Bienvenido a **BenWar**! Un juego de mecanografía tipo arcade donde debes destruir naves enemigas escribiendo las palabras que aparecen en pantalla antes de que lleguen a tu nave.

## 🎮 ¿Cómo jugar?
- Las naves enemigas bajan desde la parte superior.
- Escribe la palabra que aparece sobre cada nave para destruirla.
- No dejes que las naves lleguen a tu nave (pierdes vidas).
- Sube de nivel y aumenta la velocidad.
- ¡Compite por la mejor puntuación!

## 🕹️ Controles y ayudas especiales
- **Teclado:**
  - Escribe palabras para disparar y destruir enemigos.
  - **Bomba (tecla Enter):** Elimina hasta 4 palabras más cercanas al avión en cadena, a cambio de 1 vida. Úsala como ayuda estratégica si te ves amenazado.
- **Móvil:**
  - El juego es totalmente responsivo y los anuncios visuales se adaptan a la pantalla.

## ✨ Funcionalidades destacadas
- **Dificultad progresiva:** Más palabras, más largas y más rápidas a medida que subes de nivel.
- **Bomba especial:** Elimina varias palabras a la vez con un potente efecto visual, temblor de pantalla y sonido de explosión.
- **Estela realista:** Los disparos dejan un rastro animado tipo meteorito.
- **Bonus de vida:** Cada 10 niveles superados, ganas +1 vida y un anuncio visual te lo notifica.
- **Anuncios visuales:** Mensajes grandes y claros para nivel, bonus y uso de bomba, adaptados a escritorio y móviles.
- **Efectos responsivos:** Todos los mensajes y elementos clave se ven bien en cualquier dispositivo.

## 🖥️ Demo
Puedes desplegar este juego fácilmente en [Render](https://render.com/) o cualquier servicio de hosting estático.

## 🚀 Instalación y uso local

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repo>
   cd project-bolt-vitejs-vite-pzjfqtep
   ```
2. **Instala las dependencias:**
   ```bash
   npm install
   ```
3. **Modo desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🏗️ Build para producción
1. **Genera los archivos estáticos:**
   ```bash
   npm run build
   ```
   Los archivos se generarán en la carpeta `dist`.

2. **Previsualiza localmente el build:**
   ```bash
   npm run preview
   ```

## 🌐 Despliegue en Render u otro hosting estático
Este proyecto está configurado para funcionar en Render, Railway, Vercel, Netlify, etc.

- **Render:**
  - Build Command: `npm run build`
  - Start Command: `npm start`
  - El script `start` usa `http-server` para servir la carpeta `dist` en el puerto asignado por Render.

- **Manual:**
  - Puedes subir la carpeta `dist` a cualquier servidor estático (Apache, Nginx, Netlify, Vercel, etc).

## 📦 Scripts importantes
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "start": "http-server dist -p $PORT -a 0.0.0.0"
}
```

## 📁 Estructura de carpetas
- `src/` — Código fuente principal (JS, CSS)
- `public/images/` — Imágenes del juego (enemigos, nave, logo)
- `public/music/` y `public/sounds/` — Música y efectos de sonido
- `words/` — Listas de palabras en español e inglés

## 👨‍💻 Créditos
- Juego desarrollado por **NextAppCode**
- Mejorado con IA
- Imágenes y sonidos: recursos propios y libres de derechos

## 📝 Notas técnicas
- El juego está hecho con [Vite](https://vitejs.dev/) (vanilla JS).
- Compatible con cualquier servidor estático.
- Para producción, se recomienda servir la carpeta `dist` con un servidor estático como `http-server`.
- Las rutas de imágenes y sonidos están preparadas para la carpeta `public/`.

---
¡Disfruta BenWar, mejora tu velocidad de escritura y vive una experiencia arcade con powerups, efectos y jugabilidad moderna en cualquier dispositivo! 
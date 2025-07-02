# BenWar

¡Bienvenido a **BenWar**! Un juego de mecanografía tipo arcade donde debes destruir naves enemigas escribiendo las palabras que aparecen en pantalla antes de que lleguen a tu nave.

## 🎮 ¿Cómo se juega?

- Las naves bajan. Tú escribes. Ellas explotan.
- Si una nave toca tu base, pierdes una vida.
- Cada 10 niveles, la galaxia te recompensa con una vida extra. Un mensaje brillante y animado te lo recordará, ¡no lo dejes pasar!
- ¿Atrapado? Pulsa **Enter** y detona una bomba: elimina 4 palabras de un plumazo, pero a cambio de una vida. El universo tiembla, la pantalla vibra y un mensaje épico aparece… ahora más visible y con un desvanecimiento digno de héroes.
- ¿Tildes? Tú decides: activa o desactiva la exigencia de acentos con un botón. Y no te preocupes, el input siempre estará listo para tu próxima palabra, sin perder el ritmo.
- El avión, tu fiel aliado, girará solo cuando elijas un nuevo objetivo. Si no hay enemigos, mantendrá la última dirección, como un guardián atento.

## 🕹️ Controles y ayudas especiales
- **Teclado:**
  - Escribe palabras para disparar y destruir enemigos.
  - **Bomba (tecla Enter):** Elimina hasta 4 palabras más cercanas al avión en cadena, a cambio de 1 vida. Úsala como ayuda estratégica si te ves amenazado.
  - **Botón de tildes:** Puedes habilitar o deshabilitar la exigencia de tildes. Al cambiar esta opción, el input de palabras recupera el focus automáticamente para no interrumpir la jugabilidad.
- **Móvil:**
  - El juego es totalmente responsivo y los anuncios visuales se adaptan a la pantalla.

## ✨ Funcionalidades destacadas
- **Dificultad progresiva:** Más palabras, más largas y más rápidas a medida que subes de nivel.
- **Bomba especial:** Elimina varias palabras a la vez con un potente efecto visual, temblor de pantalla y sonido de explosión. El mensaje de bomba es grande, claro y animado.
- **Estela realista:** Los disparos dejan un rastro animado tipo meteorito.
- **Bonus de vida:** Cada 10 niveles superados, ganas +1 vida y un anuncio visual te lo notifica con animación y desvanecimiento suave.
- **Mensajes visuales mejorados:** Los mensajes de bonus y bomba son legibles, y permanecen en pantalla y se desvanecen suavemente para una mejor experiencia.
- **Avión inteligente:** El avión mantiene su dirección tras eliminar palabras y solo gira cuando apuntas a una nueva palabra.
- **Efectos responsivos:** Todos los mensajes y elementos clave se ven bien en cualquier dispositivo.

## 🖥️ Demo
Puedes probar el juego facilmente en [Render](https://benwar.onrender.com/).

## 🚀 Instalación y uso local

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/nextappcode/benwar.git
   cd benwar
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
- Juego desarrollado por **nextappcode**
- Mejorado con IA
- Imágenes y sonidos: Libres de derechos

## 📚 Permiso de uso educativo
Puedes usar BenWar en clases, talleres, cursos o cualquier contexto educativo. Solo te pedimos que menciones al desarrollador (**nextappcode**) o incluyas un enlace a este repositorio como reconocimiento.

## 📝 Notas técnicas
- El juego está hecho con [Vite](https://vitejs.dev/) (vanilla JS).
- Compatible con cualquier servidor estático.
- Para producción, se recomienda servir la carpeta `dist` con un servidor estático como `http-server`.
- Las rutas de imágenes y sonidos están preparadas para la carpeta `public/`.

---
¡Disfruta BenWar, mejora tu velocidad de escritura y vive una experiencia arcade con powerups, efectos y jugabilidad moderna en cualquier dispositivo! 
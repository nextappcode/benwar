import './style.css'
import { Game } from './game.js'

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  const game = new Game()
  game.init()

  // Sonido click para todos los botones en click, mouseenter y focus
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const clickSound = new Audio('sounds/click.ogg');
      clickSound.volume = 1.0;
      clickSound.play();
    })
    btn.addEventListener('mouseenter', () => {
      const clickSound = new Audio('sounds/click.ogg');
      clickSound.volume = 1.0;
      clickSound.play();
    })
    btn.addEventListener('focus', () => {
      const clickSound = new Audio('sounds/click.ogg');
      clickSound.volume = 1.0;
      clickSound.play();
    })
  })
})
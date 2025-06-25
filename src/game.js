import { WORDS_ES } from '../words/es.js';

export class Game {
  constructor() {
    this.score = 0
    this.lives = 3
    this.level = 1
    this.isPlaying = false
    this.words = []
    this.currentInput = ''
    this.gameSpeed = 1
    this.spawnRate = 4000 // controla cada cuánto aparece una palabra nueva
    this.wordSpeed = 20 // controla la velocidad a la que caen las palabras
    this.currentTargetWord = null // Palabra actualmente siendo escrita
    this.isPaused = false
    this.wrongKeyCount = 0
    
    // Listas de palabras por dificultad
    this.wordLists = WORDS_ES;
    
    this.gameLoop = null
    this.spawnTimer = null
    this.lastTime = 0
    
    // Audio context
    this.audioContext = null
    this.sounds = {}
    
    this.backgroundMusic = null;
    this.menuMusic = null;
    
    this.clickSound = new Audio('sounds/click.ogg');
    this.errorSound = new Audio('sounds/typing_error.ogg');
    
    this.removedWords = new Set();
    
    this.initAudio()
    this.createStarField()
  }
  
  async initAudio() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      // Crear sonidos sintéticos
      this.sounds = {
        shoot: this.createShootSound(),
        explosion: this.createExplosionSound(),
        hit: this.createHitSound(),
        gameOver: this.createGameOverSound(),
        levelUp: this.createLevelUpSound(),
        type: this.createTypeSound() // Nuevo sonido para cada letra
      }
    } catch (error) {
      console.log('Audio no disponible:', error)
    }
  }
  
  createShootSound() {
    return () => {
      if (!this.audioContext) return
      
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.1)
      
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 0.1)
    }
  }
  
  createExplosionSound() {
    return () => {
      if (!this.audioContext) return
      
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      const filter = this.audioContext.createBiquadFilter()
      
      oscillator.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.type = 'sawtooth'
      oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.3)
      
      filter.frequency.setValueAtTime(2000, this.audioContext.currentTime)
      filter.frequency.exponentialRampToValueAtTime(500, this.audioContext.currentTime + 0.3)
      
      gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 0.3)
    }
  }
  
  createHitSound() {
    return () => {
      if (!this.audioContext) return
      
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.2)
      
      gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 0.2)
    }
  }
  
  createGameOverSound() {
    return () => {
      if (!this.audioContext) return
      
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 1)
      
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 1)
    }
  }
  
  createLevelUpSound() {
    return () => {
      if (!this.audioContext) return
      
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3)
      
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 0.3)
    }
  }
  
  createTypeSound() {
    return () => {
      if (!this.audioContext) return
      
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.05)
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 0.05)
    }
  }
  
  createStarField() {
    const starsContainer = document.getElementById('stars-background')
    
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      star.style.left = Math.random() * 100 + '%'
      star.style.top = Math.random() * 100 + '%'
      star.style.animationDelay = Math.random() * 3 + 's'
      star.style.animationDuration = (Math.random() * 3 + 2) + 's'
      starsContainer.appendChild(star)
    }
  }
  
  init() {
    this.setupEventListeners()
    this.showStartScreen()
    this.setupPauseMenuEvents()
    // Pausar/reanudar automáticamente según visibilidad y foco de ventana
    const autoPause = () => {
      if (this.isPlaying && !this.isPaused) {
        this.wasAutoPaused = true;
        this.isPaused = true;
        this.stopGameLoops();
        const pauseMenu = document.getElementById('pause-menu');
        if (pauseMenu) pauseMenu.classList.remove('hidden');
      }
    };
    const autoResume = () => {
      if (this.isPlaying && this.isPaused && this.wasAutoPaused) {
        this.isPaused = false;
        this.wasAutoPaused = false;
        const pauseMenu = document.getElementById('pause-menu');
        if (pauseMenu) pauseMenu.classList.add('hidden');
        this.resumeGameLoops();
      }
    };
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        autoPause();
      } else {
        autoResume();
      }
    });
    window.addEventListener('blur', autoPause);
    window.addEventListener('focus', autoResume);
  }
  
  setupEventListeners() {
    const startBtn = document.getElementById('start-btn')
    const restartBtn = document.getElementById('restart-btn')
    const wordInput = document.getElementById('word-input')
    const playerNameInput = document.getElementById('player-name')
    
    startBtn.addEventListener('click', () => {
      const playerName = playerNameInput.value.trim()
      if (!playerName) {
        playerNameInput.classList.add('input-error')
        playerNameInput.placeholder = '¡Por favor, introduce tu nombre!'
        playerNameInput.focus()
        setTimeout(() => {
          playerNameInput.classList.remove('input-error')
          playerNameInput.placeholder = 'Introduce tu nombre'
        }, 1500)
        return
      }
      this.playerName = playerName
      // Sonido de transición de menú a juego
      const transitionSound = new Audio('sounds/transition.ogg');
      transitionSound.volume = 1.0;
      transitionSound.play();
      // Esperar a que suene la transición antes de iniciar el juego
      setTimeout(() => {
      this.startGame()
      }, 400); // Ajusta el tiempo si el sonido es más largo
    })
    
    // Permitir Enter en el input de nombre
    playerNameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        startBtn.click()
      } else {
        // Sonido de tecleo al escribir el nombre
        const typeSound = new Audio('sounds/type.ogg');
        typeSound.volume = 1.0;
        typeSound.play();
      }
    })
    
    restartBtn.addEventListener('click', () => this.restartGame())
    wordInput.addEventListener('input', (e) => this.handleInput(e))
    
    // Foco automático al cargar
    playerNameInput.focus()
    
    // Activar audio context en primera interacción
    document.addEventListener('click', () => {
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume()
      }
    }, { once: true })
  }
  
  showStartScreen() {
    document.getElementById('start-screen').classList.remove('hidden')
    document.getElementById('game-over').classList.add('hidden')
    document.getElementById('game-area').style.display = 'none'
    document.getElementById('game-header').style.display = 'none'
    // Música de menú
    if (!this.menuMusic) {
      this.menuMusic = new Audio('music/menu_music.ogg');
      this.menuMusic.loop = true;
      this.menuMusic.volume = 0.5;
    }
    this.menuMusic.currentTime = 0;
    this.menuMusic.play();
    // Pausar música de juego si está sonando
    if (this.backgroundMusic && !this.backgroundMusic.paused) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }
  
  startGame() {
    this.isPlaying = true
    this.score = 0
    this.lives = 3
    this.level = 1
    this.words = []
    this.gameSpeed = 1
    this.currentTargetWord = null
    this.wrongKeyCount = 0
    this.removedWords = new Set();
    // Limpiar el contenedor de palabras por si acaso
    const wordsContainer = document.getElementById('words-container');
    if (wordsContainer) wordsContainer.innerHTML = '';
    document.getElementById('start-screen').classList.add('hidden')
    document.getElementById('game-over').classList.add('hidden')
    document.getElementById('game-area').style.display = 'block'
    document.getElementById('game-header').style.display = 'flex'
    this.updateUI()
    this.startGameLoop()
    this.startWordSpawning()
    document.getElementById('word-input').focus()
    
    if (!this.backgroundMusic) {
      const tracks = ['music/gaming_music1.ogg', 'music/gaming_music2.ogg'];
      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      this.backgroundMusic = new Audio(randomTrack);
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = 0.5;
    }
    this.backgroundMusic.currentTime = 0;
    this.backgroundMusic.play();
    if (this.menuMusic && !this.menuMusic.paused) {
      this.menuMusic.pause();
      this.menuMusic.currentTime = 0;
    }
  }
  
  startGameLoop() {
    const gameLoop = (currentTime) => {
      if (!this.isPlaying || this.isPaused) return
      
      const deltaTime = currentTime - this.lastTime
      this.lastTime = currentTime
      
      this.updateWords(deltaTime)
      this.checkCollisions()
      this.renderWords()
      
      this.gameLoop = requestAnimationFrame(gameLoop)
    }
    
    this.lastTime = performance.now()
    this.gameLoop = requestAnimationFrame(gameLoop)
  }
  
  startWordSpawning() {
    const spawnWord = () => {
      if (!this.isPlaying || this.isPaused) return
      
      this.spawnRandomWord()
      
      const adjustedSpawnRate = Math.max(800, this.spawnRate - (this.level * 200))
      this.spawnTimer = setTimeout(spawnWord, adjustedSpawnRate)
    }
    
    spawnWord()
  }
  
  spawnRandomWord() {
    // 70 niveles: ajusta la longitud de palabra progresivamente
    const minLen = 3;
    const maxLen = 14; // según WORDS_ES
    // Calcula la longitud objetivo según el nivel
    let wordLength = Math.round(minLen + ((maxLen - minLen) * (this.level - 1) / 69));
    // Para dar variedad, permite +-1 de la longitud objetivo
    let possibleLengths = [wordLength];
    if (wordLength > minLen) possibleLengths.push(wordLength - 1);
    if (wordLength < maxLen) possibleLengths.push(wordLength + 1);
    // Filtra solo longitudes disponibles
    possibleLengths = possibleLengths.filter(l => this.wordLists[l] && this.wordLists[l].length > 0);
    if (possibleLengths.length === 0) possibleLengths = Object.keys(this.wordLists);
    const chosenLength = possibleLengths[Math.floor(Math.random() * possibleLengths.length)];
    const wordsOfLength = this.wordLists[chosenLength];
    let filteredWords = wordsOfLength.filter(w => !this.removedWords.has(w.toLowerCase()));
    if (filteredWords.length === 0) filteredWords = wordsOfLength;
    const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    const gameArea = document.getElementById('game-area');
    const maxX = gameArea.offsetWidth - 150;
    const x = Math.random() * maxX;
    const word = {
      text: randomWord,
      originalText: randomWord,
      x: x,
      y: 0,
      speed: this.wordSpeed,
      element: this.createWordElement(randomWord),
      typedLength: 0
    };
    // Posiciona el elemento en el DOM en la parte superior
    word.element.style.left = `${x}px`;
    word.element.style.top = `0px`;
    word.element.style.transform = '';
    this.words.push(word);
    document.getElementById('words-container').appendChild(word.element);
  }
  
  createWordElement(text) {
    const enemyImages = ['enemy1.PNG', 'enemy2.PNG', 'enemy3.PNG'];
    const randomImg = enemyImages[Math.floor(Math.random() * enemyImages.length)];
    const wordElement = document.createElement('div')
    wordElement.className = 'enemy-ship'
    wordElement.innerHTML = `
      <div class="ship-sprite" style="background: none; width: 60px; height: 60px; margin: 0 auto 5px;">
        <img src="${randomImg}" alt="enemigo" class="enemy-img" style="width: 100%; height: 100%; object-fit: contain; display: block; filter: drop-shadow(0 0 10px #ff4444) drop-shadow(0 0 20px #ff8800);" />
      </div>
      <div class="word-text">
        <span class="typed-letters"></span><span class="remaining-letters">${text}</span>
      </div>
    `
    return wordElement
  }
  
  updateWords(deltaTime) {
    this.words.forEach(word => {
      word.y += (word.speed * deltaTime) / 1000;
      word.element.style.top = `${word.y}px`;
      // La posición horizontal (left) no cambia
    });
  }
  
  checkCollisions() {
    const gameArea = document.getElementById('game-area')
    const gameAreaHeight = gameArea.offsetHeight - 120
    
    this.words = this.words.filter(word => {
      if (word.y > gameAreaHeight) {
        this.loseLife()
        word.element.remove()
        this.currentTargetWord = null
        this.clearInput()
        this.updateUI()
        return false
      }
      return true
    })
  }
  
  renderWords() {
    // Las palabras ya se actualizan en updateWords
  }
  
  handleInput(e) {
    const input = e.target.value.toLowerCase()
    
    // Si no hay palabra objetivo, buscar una que coincida
    if (!this.currentTargetWord) {
      this.findTargetWord(input)
    }
    
    // Si hay palabra objetivo, procesar la entrada
    if (this.currentTargetWord) {
      this.processTyping(input)
    } else {
      // Si no hay coincidencia, resetear combo
      if (input.length > 0) {
        this.clearInput()
        this.updateUI()
      }
    }
  }
  
  findTargetWord(input) {
    if (input.length === 0) return
    
    // Buscar la primera palabra que comience con la entrada
    const matchingWord = this.words.find(word => 
      word.originalText.toLowerCase().startsWith(input) && word.typedLength === 0
    )
    
    if (matchingWord) {
      this.currentTargetWord = matchingWord
      this.currentTargetWord.element.classList.add('targeted')
    }
  }
  
  processTyping(input) {
    const targetText = this.currentTargetWord.originalText.toLowerCase()
    
    // Verificar si la entrada coincide con la palabra objetivo
    if (targetText.startsWith(input)) {
      // Actualizar la visualización de la palabra
      this.updateWordDisplay(this.currentTargetWord, input.length)
      
      // Reproducir sonido de tecleo si se añadió una letra
      if (input.length > this.currentTargetWord.typedLength) {
        this.sounds.type()
        this.currentTargetWord.typedLength = input.length
        const clickSound = new Audio('sounds/type.ogg');
        clickSound.volume = 1.0;
        clickSound.play();
      }
      
      // Si se completó la palabra
      if (input === targetText) {
        this.completeWord(this.currentTargetWord)
      }
    } else {
      // La entrada no coincide, resetear
      const errorSound = new Audio('sounds/typing_error.ogg');
      errorSound.volume = 1.0;
      errorSound.play();
      this.resetCurrentTarget()
    }
  }
  
  updateWordDisplay(word, typedLength) {
    const typedLetters = word.element.querySelector('.typed-letters')
    const remainingLetters = word.element.querySelector('.remaining-letters')
    
    const typed = word.originalText.substring(0, typedLength)
    const remaining = word.originalText.substring(typedLength)
    
    typedLetters.textContent = typed
    remainingLetters.textContent = remaining
  }
  
  completeWord(word) {
    const wordIndex = this.words.indexOf(word)
    if (wordIndex !== -1) {
      this.destroyWord(word, wordIndex)
      this.addScore(word.originalText.length * 10)
      this.sounds.shoot()
      this.sounds.explosion()
      this.createExplosion(word.x + 75, word.y + 30)
      // Sonido de explosión de palabra
      const explosionWordSound = new Audio('sounds/explosion_word.ogg');
      explosionWordSound.volume = 1.0;
      explosionWordSound.play();
      // Guardar palabra eliminada
      this.removedWords.add(word.originalText.toLowerCase());
      // Resetear objetivo y limpiar input
      this.currentTargetWord = null
      this.clearInput()
      this.updateUI()
    }
  }
  
  resetCurrentTarget() {
    if (this.currentTargetWord) {
      this.currentTargetWord.element.classList.remove('targeted')
      this.updateWordDisplay(this.currentTargetWord, 0)
      this.currentTargetWord.typedLength = 0
      this.currentTargetWord = null
    }
    // Descontar puntos por error
    this.score = Math.max(0, this.score - 20) // Descontar puntos por error
    this.wrongKeyCount = (this.wrongKeyCount || 0) + 1;
    this.clearInput()
    this.updateUI()
  }
  
  createExplosion(x, y) {
    const explosion = document.createElement('div')
    explosion.className = 'explosion'
    explosion.style.left = x + 'px'
    explosion.style.top = y + 'px'
    
    document.getElementById('explosions-container').appendChild(explosion)
    
    setTimeout(() => {
      explosion.remove()
    }, 600)
  }
  
  destroyWord(word, index) {
    // Obtener la imagen enemiga dentro de la nave
    const enemyImg = word.element.querySelector('.enemy-img');
    if (enemyImg) {
      enemyImg.classList.add('exploding');
    }
    // Obtener el texto de la palabra
    const wordText = word.element.querySelector('.word-text');
    if (wordText) {
      wordText.classList.add('exploding');
    }
    // Crear partículas de explosión
    this.createExplosionParticles(word);
    setTimeout(() => {
      word.element.remove();
    }, 400); // Duración de la animación CSS
    this.words.splice(index, 1);
  }
  
  createExplosionParticles(word) {
    const container = document.getElementById('explosions-container');
    if (!container) return;
    // Calcular posición central de la palabra
    const rect = word.element.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 - parentRect.left;
    const centerY = rect.top + rect.height / 2 - parentRect.top;
    // Crear muchas partículas pequeñas
    const numParticles = 28;
    const colorPairs = [
      ['#fff700', '#ff8800'],
      ['#ff8800', '#ff4444'],
      ['#fff', '#ffd700'],
      ['#ff4444', '#fff700'],
      ['#ffd700', '#fff700']
    ];
    for (let i = 0; i < numParticles; i++) {
      const angle = (2 * Math.PI * i) / numParticles + Math.random() * 0.2;
      const distance = 50 + Math.random() * 40;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const particle = document.createElement('div');
      particle.className = 'explosion-particle';
      particle.style.left = `${centerX - 2}px`;
      particle.style.top = `${centerY - 2}px`;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);
      // Color aleatorio
      const [c1, c2] = colorPairs[Math.floor(Math.random() * colorPairs.length)];
      particle.style.setProperty('--particle-color1', c1);
      particle.style.setProperty('--particle-color2', c2);
      // Tamaño aleatorio
      const scale = 0.7 + Math.random() * 1.2;
      particle.style.setProperty('--particle-scale', scale);
      container.appendChild(particle);
      setTimeout(() => {
        particle.remove();
      }, 900);
    }
  }
  
  addScore(points) {
    this.score += points
    this.updateUI()
    this.checkLevelUp()
  }
  
  checkLevelUp() {
    // 70 niveles
    const newLevel = Math.min(70, Math.floor(this.score / 500) + 1);
    if (newLevel > this.level) {
      this.level = newLevel;
      this.sounds.levelUp();
      this.updateUI();
      // Mostrar transición visual de nivel
      const levelUpDiv = document.getElementById('level-up-transition');
      if (levelUpDiv) {
        levelUpDiv.textContent = `¡Nivel ${this.level}!`;
        levelUpDiv.classList.add('show');
        levelUpDiv.classList.remove('hidden');
        setTimeout(() => {
          levelUpDiv.classList.remove('show');
          levelUpDiv.classList.add('hidden');
        }, 1200);
      }
    }
  }
  
  loseLife() {
    this.lives--
    this.sounds.hit()
    this.updateUI()
    
    if (this.lives <= 0) {
      this.gameOver()
    }
  }
  
  clearInput() {
    document.getElementById('word-input').value = ''
  }
  
  updateUI() {
    document.getElementById('score-value').textContent = this.score
    document.getElementById('lives-value').textContent = this.lives
    document.getElementById('level-value').textContent = this.level
  }
  
  gameOver() {
    this.isPlaying = false
    this.isPaused = true
    this.sounds.gameOver()
    // Sonido de transición de game over
    const gameOverSound = new Audio('sounds/game_over.ogg');
    gameOverSound.volume = 1.0;
    gameOverSound.play();
    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop)
    }
    if (this.spawnTimer) {
      clearTimeout(this.spawnTimer)
    }
    this.words.forEach(word => word.element.remove())
    this.words = []
    this.currentTargetWord = null
    // Mostrar nombre del jugador
    const playerName = this.playerName || '';
    const playerNameDisplay = document.getElementById('player-name-display');
    if (playerNameDisplay) {
      playerNameDisplay.textContent = playerName;
    }
    // Personaliza el mensaje de game over con el nombre
    const gameOverTitle = document.querySelector('#game-over h2');
    if (gameOverTitle) {
      gameOverTitle.textContent = `¡Fin del juego, ${playerName}! ¡Buen trabajo! 🚀`;
    }
    document.getElementById('final-score').textContent = this.score
    document.getElementById('final-level').textContent = this.level
    // NUEVO: Mostrar teclas equivocadas y puntos descontados
    const wrongKeyElem = document.getElementById('final-wrong-keys');
    if (wrongKeyElem) {
      wrongKeyElem.textContent = this.wrongKeyCount;
    }
    const wrongPointsElem = document.getElementById('final-wrong-points');
    if (wrongPointsElem) {
      wrongPointsElem.textContent = this.wrongKeyCount * 20;
    }
    document.getElementById('game-over').classList.remove('hidden')
    document.getElementById('game-area').style.display = 'none'
    document.getElementById('game-header').style.display = 'none'
    if (this.backgroundMusic && !this.backgroundMusic.paused) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
    if (this.menuMusic) {
      this.menuMusic.currentTime = 0;
      this.menuMusic.play();
    }
  }
  
  restartGame() {
    // Limpiar palabras del DOM y del array
    const wordsContainer = document.getElementById('words-container');
    if (wordsContainer) wordsContainer.innerHTML = '';
    this.words = [];
    this.currentTargetWord = null;
    this.wrongKeyCount = 0;
    this.isPaused = false; // Asegura que el juego no esté en pausa
    this.removedWords = new Set();
    this.startGame();
  }
  
  setupPauseMenuEvents() {
    // Tecla Escape para pausar/reanudar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isPlaying) {
        e.preventDefault();
        this.togglePauseMenu();
      }
    });
    // Botones del menú de pausa
    const pauseMenu = document.getElementById('pause-menu');
    const continueBtn = document.getElementById('continue-btn');
    const restartBtn = document.getElementById('restart-game-btn');
    const exitBtn = document.getElementById('exit-game-btn');
    if (continueBtn) continueBtn.onclick = () => this.togglePauseMenu();
    if (restartBtn) restartBtn.onclick = () => {
      this.hidePauseMenu();
      this.restartGame();
    };
    if (exitBtn) exitBtn.onclick = () => window.location.reload();
  }
  
  togglePauseMenu() {
    this.isPaused = !this.isPaused;
    const pauseMenu = document.getElementById('pause-menu');
    if (this.isPaused) {
      this.stopGameLoops();
      pauseMenu.classList.remove('hidden');
    } else {
      pauseMenu.classList.add('hidden');
      this.resumeGameLoops();
    }
  }
  
  hidePauseMenu() {
    this.isPaused = false;
    const pauseMenu = document.getElementById('pause-menu');
    pauseMenu.classList.add('hidden');
  }
  
  stopGameLoops() {
    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop);
      this.gameLoop = null;
    }
    if (this.spawnTimer) {
      clearTimeout(this.spawnTimer);
      this.spawnTimer = null;
    }
    if (this.backgroundMusic && !this.backgroundMusic.paused) {
      this.backgroundMusic.pause();
    }
    // Si el menú de pausa está visible, reanuda la música del menú
    const pauseMenu = document.getElementById('pause-menu');
    if (pauseMenu && !pauseMenu.classList.contains('hidden')) {
      if (this.menuMusic) {
        this.menuMusic.currentTime = 0;
        this.menuMusic.play();
      }
    }
  }
  
  resumeGameLoops() {
    if (this.isPlaying && !this.isPaused) {
      this.lastTime = performance.now();
      this.startGameLoop();
      this.startWordSpawning();
      if (this.backgroundMusic && this.backgroundMusic.paused) {
        this.backgroundMusic.play();
      }
      if (this.menuMusic && !this.menuMusic.paused) {
        this.menuMusic.pause();
        this.menuMusic.currentTime = 0;
      }
    }
  }
}
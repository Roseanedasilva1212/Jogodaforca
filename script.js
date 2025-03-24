const word = "javascript"; // Palavra para adivinhar
const maxErrors = 6; // Limite de erros
let errors = 0;
let guessedLetters = [];

const hangmanCanvas = document.getElementById("hangman");
const wordContainer = document.getElementById("word-container");
const lettersContainer = document.getElementById("letters-container");
const restartBtn = document.getElementById("restart-btn");

// Inicializa jogo
function initializeGame() {
  guessedLetters = [];
  errors = 0;
  displayWord();
  setupLetters();
}

// Exibe letras adivinhadas ou "_"
function displayWord() {
  wordContainer.innerHTML = word.split("").map(letter => (
    guessedLetters.includes(letter) ? letter : "_"
  )).join(" ");
}

// Configura botões de letras
function setupLetters() {
  lettersContainer.innerHTML = "";
  for (let char of "abcdefghijklmnopqrstuvwxyz") {
    const button = document.createElement("button");
    button.textContent = char;
    button.onclick = () => guessLetter(char);
    lettersContainer.appendChild(button);
  }
}

// Verifica se letra está na palavra
function guessLetter(letter) {
  if (word.includes(letter)) {
    guessedLetters.push(letter);
    displayWord();
    if (!wordContainer.textContent.includes("_")) {
      alert("Você ganhou!");
    }
  } else {
    errors++;
    drawHangman();
    if (errors === maxErrors) {
      alert("Você perdeu! A palavra era: " + word);
    }
  }
}

// Desenha forca e boneco
function drawHangman() {
  const ctx = hangmanCanvas.getContext("2d");
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#2e7d32";

  switch (errors) {
    case 1: ctx.strokeRect(100, 140, 80, 20); break; // Base
    case 2: ctx.beginPath(); ctx.moveTo(140, 140); ctx.lineTo(140, 40); ctx.stroke(); break; // Poste
    case 3: ctx.beginPath(); ctx.moveTo(140, 40); ctx.lineTo(180, 40); ctx.stroke(); break; // Braço
    case 4: ctx.beginPath(); ctx.moveTo(180, 40); ctx.lineTo(180, 60); ctx.stroke(); break; // Corda
    case 5: ctx.beginPath(); ctx.arc(180, 70, 10, 0, Math.PI * 2); ctx.stroke(); break; // Cabeça
    case 6: ctx.beginPath(); ctx.moveTo(180, 80); ctx.lineTo(180, 110); ctx.stroke(); break; // Corpo
  }
}

// Recomeça jogo
restartBtn.onclick = initializeGame;

initializeGame();

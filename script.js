// Word list for the game
const wordList = [
    'javascript', 'python', 'developer', 'coding', 'program',
    'function', 'variable', 'database', 'network', 'server',
    'client', 'frontend', 'backend', 'algorithm', 'array',
    'object', 'string', 'number', 'boolean', 'constant',
    'mutation', 'closure', 'promise', 'async', 'await',
    'export', 'import', 'module', 'package', 'library',
    'framework', 'react', 'nodejs', 'express', 'mongodb',
    'github', 'gitlab', 'docker', 'kubernetes', 'api',
    'rest', 'graphql', 'socket', 'websocket', 'http',
    'https', 'ssl', 'encryption', 'hash', 'salt',
    'dunajec', 'studio', 'flavortown', 'hackclub', 'design'
];

// Game variables
let gameActive = false;
let gameTime = 60;
let score = 0;
let totalTyped = 0;
let correctTyped = 0;
let currentWord = '';
let timerInterval = null;

// DOM elements
const wordDisplay = document.getElementById('wordDisplay');
const inputField = document.getElementById('inputField');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const gameOverScreen = document.getElementById('gameOver');

// Get random word from list
function getRandomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

// Start the game
function startGame() {
    gameActive = true;
    gameTime = 60;
    score = 0;
    totalTyped = 0;
    correctTyped = 0;
    gameOverScreen.style.display = 'none';
    inputField.disabled = false;
    inputField.focus();
    startBtn.disabled = true;
    resetBtn.disabled = true;

    currentWord = getRandomWord();
    wordDisplay.textContent = currentWord;
    inputField.value = '';

    // Start timer
    timerInterval = setInterval(() => {
        gameTime--;
        timerDisplay.textContent = gameTime;

        if (gameTime <= 0) {
            endGame();
        }
    }, 1000);
}

// End the game
function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    inputField.disabled = true;
    startBtn.disabled = false;
    resetBtn.disabled = false;

    const finalWpm = Math.round((score / gameTime) * 60);
    const finalAccuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 0;

    document.getElementById('finalWpm').textContent = finalWpm;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalAccuracy').textContent = finalAccuracy;

    gameOverScreen.style.display = 'block';
}

// Reset the game
function resetGame() {
    clearInterval(timerInterval);
    gameActive = false;
    gameTime = 60;
    score = 0;
    totalTyped = 0;
    correctTyped = 0;

    timerDisplay.textContent = '60';
    scoreDisplay.textContent = '0';
    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '100';
    inputField.value = '';
    inputField.disabled = true;
    inputField.classList.remove('correct', 'wrong');
    wordDisplay.textContent = 'Click to start!';
    gameOverScreen.style.display = 'none';
    startBtn.disabled = false;
    resetBtn.disabled = false;
}

// Update stats
function updateStats() {
    const timeElapsed = (60 - gameTime) / 60;
    const wpm = timeElapsed > 0 ? Math.round((score / timeElapsed) / 60) : 0;
    const accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 100;

    scoreDisplay.textContent = score;
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
}

// Handle input
inputField.addEventListener('input', (e) => {
    if (!gameActive) return;

    const userInput = e.target.value.trim();
    totalTyped += e.data ? 1 : 0;

    if (userInput === '') {
        inputField.classList.remove('correct', 'wrong');
        return;
    }

    if (userInput === currentWord) {
        // Correct word typed
        score++;
        correctTyped += userInput.length;
        inputField.classList.add('correct');
        inputField.classList.remove('wrong');

        // Get next word
        setTimeout(() => {
            currentWord = getRandomWord();
            wordDisplay.textContent = currentWord;
            inputField.value = '';
            inputField.classList.remove('correct', 'wrong');
            updateStats();
        }, 100);
    } else if (currentWord.startsWith(userInput)) {
        // Correct so far
        inputField.classList.remove('wrong');
        inputField.classList.add('correct');
        correctTyped++;
    } else {
        // Wrong
        inputField.classList.remove('correct');
        inputField.classList.add('wrong');
    }
});

// Event listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', () => {
    resetGame();
    startGame();
});

// Prevent pasting
inputField.addEventListener('paste', (e) => {
    e.preventDefault();
    alert('❌ Pasting is not allowed in this game!');
});
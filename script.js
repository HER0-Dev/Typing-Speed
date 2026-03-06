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
let playerName = '';

// DOM elements
const playerNameInput = document.getElementById('playerNameInput');
const setNameBtn = document.getElementById('setNameBtn');
const currentPlayerDisplay = document.getElementById('currentPlayer');
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
const clearLeaderboardBtn = document.getElementById('clearLeaderboardBtn');
const exportBtn = document.getElementById('exportBtn');

// ===== RANKING SYSTEM =====

// Load leaderboard from localStorage
function loadLeaderboard() {
    const saved = localStorage.getItem('typingGameLeaderboard');
    return saved ? JSON.parse(saved) : [];
}

// Save leaderboard to localStorage
function saveLeaderboard(leaderboard) {
    localStorage.setItem('typingGameLeaderboard', JSON.stringify(leaderboard));
}

// Add score to leaderboard
function addToLeaderboard(name, wpm, accuracy, score) {
    if (!name || name.trim() === '') {
        name = 'Anonymous';
    }

    let leaderboard = loadLeaderboard();

    leaderboard.push({
        name: name.trim().substring(0, 20),
        wpm: wpm,
        accuracy: accuracy,
        score: score,
        date: new Date().toLocaleDateString()
    });

    // Sort by WPM (highest first)
    leaderboard.sort((a, b) => b.wpm - a.wpm);

    // Keep only top 50
    leaderboard = leaderboard.slice(0, 50);

    saveLeaderboard(leaderboard);
    displayLeaderboard();
}

// Display leaderboard
function displayLeaderboard() {
    const leaderboard = loadLeaderboard();
    const leaderboardHTML = document.getElementById('leaderboardList');

    if (leaderboard.length === 0) {
        leaderboardHTML.innerHTML = '<p class="no-scores">No scores yet. Be the first! 🏆</p>';
        return;
    }

    let html = '<table class="leaderboard-table">';
    html += '<thead><tr><th>Rank</th><th>Name</th><th>WPM</th><th>Accuracy</th><th>Score</th><th>Date</th></tr></thead>';
    html += '<tbody>';

    leaderboard.forEach((entry, index) => {
        const medals = ['🥇', '🥈', '🥉'];
        const medal = index < 3 ? medals[index] : (index + 1);
        html += `<tr class="leaderboard-row">
            <td><span class="medal">${medal}</span></td>
            <td><strong>${entry.name}</strong></td>
            <td><strong>${entry.wpm} WPM</strong></td>
            <td>${entry.accuracy}%</td>
            <td>${entry.score}</td>
            <td>${entry.date}</td>
        </tr>`;
    });

    html += '</tbody></table>';
    leaderboardHTML.innerHTML = html;
}

// Load player name from localStorage
function loadPlayerName() {
    const saved = localStorage.getItem('playerName');
    if (saved) {
        playerName = saved;
        playerNameInput.value = playerName;
        updatePlayerDisplay();
    }
}

// Save player name to localStorage
function savePlayerName(name) {
    localStorage.setItem('playerName', name);
}

// Update player display
function updatePlayerDisplay() {
    if (playerName && playerName.trim() !== '') {
        currentPlayerDisplay.innerHTML = `Player: <strong>${playerName}</strong> ✅`;
    } else {
        currentPlayerDisplay.innerHTML = `Player: <strong>Not set</strong>`;
    }
}

// Set player name
setNameBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    if (name === '') {
        alert('❌ Please enter a nickname!');
        return;
    }
    if (name.length > 20) {
        alert('❌ Nickname is too long! Max 20 characters.');
        return;
    }

    playerName = name;
    savePlayerName(playerName);
    updatePlayerDisplay();
    playerNameInput.value = '';
    playerNameInput.placeholder = `Playing as: ${playerName}`;
});

// Allow Enter key to set name
playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        setNameBtn.click();
    }
});

// Clear leaderboard
clearLeaderboardBtn.addEventListener('click', () => {
    if (confirm('⚠️ Are you sure? This will clear all scores!')) {
        localStorage.removeItem('typingGameLeaderboard');
        displayLeaderboard();
    }
});

// Export leaderboard
exportBtn.addEventListener('click', () => {
    const leaderboard = loadLeaderboard();
    const csvContent = "data:text/csv;charset=utf-8," +
        "Rank,Name,WPM,Accuracy,Score,Date\n" +
        leaderboard.map((entry, index) =>
            `${index + 1},${entry.name},${entry.wpm},${entry.accuracy},${entry.score},${entry.date}`
        ).join('\n');

    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'leaderboard.csv');
    link.click();
});

// Get random word from list
function getRandomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

// Start the game
function startGame() {
    if (!playerName || playerName.trim() === '') {
        alert('❌ Please set your nickname first!');
        playerNameInput.focus();
        return;
    }

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
    setNameBtn.disabled = true;
    playerNameInput.disabled = true;

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
    setNameBtn.disabled = false;
    playerNameInput.disabled = false;

    const finalWpm = Math.round((score / 60) * 60) || 0;
    const finalAccuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 0;

    document.getElementById('finalWpm').textContent = finalWpm;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalAccuracy').textContent = finalAccuracy;
    document.getElementById('gameOverPlayer').textContent = `👤 ${playerName}`;

    // Add to leaderboard
    addToLeaderboard(playerName, finalWpm, finalAccuracy, score);

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
    setNameBtn.disabled = false;
    playerNameInput.disabled = false;
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
        score++;
        correctTyped += userInput.length;
        inputField.classList.add('correct');
        inputField.classList.remove('wrong');

        setTimeout(() => {
            currentWord = getRandomWord();
            wordDisplay.textContent = currentWord;
            inputField.value = '';
            inputField.classList.remove('correct', 'wrong');
            updateStats();
        }, 100);
    } else if (currentWord.startsWith(userInput)) {
        inputField.classList.remove('wrong');
        inputField.classList.add('correct');
        correctTyped++;
    } else {
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

// Initialize on page load
window.addEventListener('load', () => {
    displayLeaderboard();
    loadPlayerName();
});
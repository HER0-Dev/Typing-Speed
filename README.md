# ⌨️ Typing Speed Test - Hack Club Flavortown Edition

A fast-paced, competitive typing game built for **Hack Club Flavortown**. Test your typing speed, compete on the global leaderboard, and prove you're the fastest typist!

## 🎮 Game Overview

**Typing Speed Test** is a fun and engaging web application where players race against the clock to type random words as quickly and accurately as possible. The game tracks your **Words Per Minute (WPM)**, **Accuracy**, and **Score**, and automatically adds your results to a global leaderboard.

### Perfect For:
- 🏫 Hack Club events and competitions
- 👥 Group challenges and tournaments
- 🎯 Personal skill improvement
- 🏆 Friendly competitions

---

## 🎯 Features

### Core Gameplay
- ⏱️ **60-Second Timer** - Race against the clock to type as many words as possible
- 📊 **Real-time Stats** - Monitor your performance with live WPM, accuracy, and score updates
- 🎨 **Visual Feedback** - Green for correct words, red for mistakes
- 🚫 **Anti-Cheat** - Prevents pasting to ensure fair competition

### Player System
- 👤 **Nickname Registration** - Set your unique nickname before playing
- 💾 **Persistent Player Data** - Your nickname is saved locally for future games
- 🎖️ **Player Recognition** - See your name on the leaderboard after each game

### Leaderboard
- 🏆 **Global Leaderboard** - Top 50 players ranked by WPM
- 🥇🥈🥉 **Medal Rankings** - Gold, Silver, and Bronze medals for top 3 players
- 📅 **Date Tracking** - See when each score was achieved
- 📥 **Export to CSV** - Download the leaderboard as a spreadsheet
- 🗑️ **Local Management** - Clear leaderboard data (local storage)

### Design & UX
- 🎨 **Beautiful Gradient UI** - Modern purple-to-violet gradient background
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ✨ **Smooth Animations** - Floating logo and hover effects
- 🌙 **Professional Styling** - Clean, modern interface optimized for gameplay

---

## 📊 Game Mechanics

### How to Play

1. **Set Your Nickname**
   - Enter your unique nickname in the player info section
   - Click "Set Nickname" to confirm
   - Your name will be displayed and saved

2. **Start the Game**
   - Click the "Start Game" button
   - A random word will appear on screen
   - You have 60 seconds to type as many words as possible

3. **Type Words**
   - Type the displayed word exactly as shown
   - Press Space or simply continue typing to move to the next word
   - The game auto-advances when you type correctly

4. **Game Over**
   - When time runs out, see your final stats:
     - **WPM** - Words typed per minute
     - **Score** - Number of words typed correctly
     - **Accuracy** - Percentage of correct characters
   - Your result is automatically added to the global leaderboard

### Scoring System

- **WPM (Words Per Minute)** = (Total Words Typed / Time Elapsed) × 60
- **Accuracy** = (Correct Characters / Total Characters Typed) × 100
- **Score** = Total Number of Correct Words

---

## 📈 Statistics & Metrics

The game tracks four key metrics in real-time:

| Metric | Description | Unit |
|--------|-------------|------|
| **Time** | Countdown timer | Seconds |
| **Score** | Number of correct words typed | Words |
| **WPM** | Words typed per minute | Words/Min |
| **Accuracy** | Percentage of correct keystrokes | Percent |

---

## 🏅 Leaderboard Features

### Ranking System
- Players are ranked by **WPM (highest first)**
- Top 50 scores are stored and displayed
- Medals awarded to top 3:
  - 🥇 1st Place - Gold
  - 🥈 2nd Place - Silver
  - 🥉 3rd Place - Bronze

### Data Management
- **Local Storage** - All data stored in your browser (no server required)
- **Export** - Download leaderboard as CSV file for record-keeping
- **Clear** - Reset leaderboard with one click (with confirmation)

---

## 🛠️ Technical Stack

### Frontend
- **HTML5** - Semantic markup and game structure
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - No frameworks, lightweight and fast

### Storage
- **Browser LocalStorage** - Persistent data without external servers
- **JSON Format** - Easy to export and share

### Deployment
- **Vercel** - Fast, reliable, free hosting
- **GitHub** - Version control and easy deployment
- **Static Site** - No backend required

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (only needed for initial load)
- No installation required!

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/HER0-Dev/typing-speed-test.git
   cd typing-speed-test

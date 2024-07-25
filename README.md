# Tic Tac Toe Game

This is a real-time Tic Tac Toe game that can be played with a friend over a network using WebSockets. Players take turns placing their marks on a 3x3 grid until one of them wins or the game ends in a draw.

## Features

- Real-time gameplay
- Connect two players over a network
- Simple and interactive terminal interface
- Display game board after each move

## Requirements

- Node.js installed on your machine

## How to Run

1. Clone the repository:

   ```
   git clone https://github.com/your-repo/tic-tac-toe-game.git
   cd tic-tac-toe-game
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Start the WebSocket server:

   ```
   node server.js
   ```

4. Start the first client in a new terminal:

   ```
   node client.js
   ```

5. Start the second client in another terminal:

   ```
   node client.js
   ```

6. Follow the prompts to enter your name and start playing Tic Tac Toe!

## Game Rules

- Each player is assigned a symbol (X or O).
- Players take turns placing their symbol on a 3x3 grid.
- The first player to align three of their symbols in a row, column, or diagonal wins the game.
- If all nine cells are filled without a winner, the game ends in a draw.

---

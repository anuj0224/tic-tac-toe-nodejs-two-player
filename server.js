const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let players = [];
let playerNames = [];
let currentPlayerIndex = 0;
const board = Array(9).fill(null);
const symbols = ['X', 'O'];

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return board.includes(null) ? null : 'Draw';
}

function printBoard() {
    return `
      ${board[0] || ' '} | ${board[1] || ' '} | ${board[2] || ' '}
     ---+---+---
      ${board[3] || ' '} | ${board[4] || ' '} | ${board[5] || ' '}
     ---+---+---
      ${board[6] || ' '} | ${board[7] || ' '} | ${board[8] || ' '}
    `;
}

wss.on('connection', (ws) => {
    ws.send('Enter your name:');

    ws.on('message', (message) => {
        const playerIndex = players.indexOf(ws);
        if (playerIndex === -1) {
            // New player
            playerNames.push(message.toString());
            players.push(ws);

            if (players.length < 2) {
                ws.send(`Welcome, ${message.toString()}! Waiting for another player to join...`);
            } else if (players.length === 2) {
                broadcast(`Game started! ${playerNames[0]} (X) vs ${playerNames[1]} (O)`);
                broadcast(printBoard());
                players[currentPlayerIndex].send(`Your turn, ${playerNames[currentPlayerIndex]}! (You are X)`);
            }
        } else {
            // Existing player
            if (players[currentPlayerIndex] === ws) {
                const move = parseInt(message.toString(), 10);
                if (!board[move] && move >= 0 && move < 9) {
                    board[move] = symbols[currentPlayerIndex];
                    const winner = checkWinner();

                    players.forEach((player) => {
                        player.send(printBoard());
                    });

                    if (winner) {
                        broadcast(winner === 'Draw' ? 'The game is a draw!' : `${playerNames[currentPlayerIndex]} (${symbols[currentPlayerIndex]}) wins!`);
                        wss.close();
                    } else {
                        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
                        players[currentPlayerIndex].send(`Your turn, ${playerNames[currentPlayerIndex]}!`);
                    }
                } else {
                    ws.send('Invalid move, try again:');
                }
            } else {
                ws.send('Not your turn!');
            }
        }
    });

    ws.on('close', () => {
        players = players.filter(player => player !== ws);
        playerNames = playerNames.filter((_, index) => players[index] !== ws);
    });
});

function broadcast(message) {
    players.forEach(player => player.send(message));
}

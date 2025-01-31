const prompt = require('prompt-sync')();

let gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = 'x';
let gameActive = true;

function printBoard() {
    console.log(`
        ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
        ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
        ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}
    `);
}

function handleMove(position) {
    if (gameBoard[position] === " ") {
        gameBoard[position] = currentPlayer;
        return true;
    } else {
        console.log("Cell already taken, choose another one.");
        return false;
    }
}

function checkWin() {
    const conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return conditions.some(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer;
    });
}

while (gameActive) {
    printBoard();
    const position = prompt(`Player ${currentPlayer}, enter your move (0-8): `);

    if (position >= 0 && position <= 8) {
        if (handleMove(parseInt(position))) {
            if (checkWin()) {
                printBoard();
                console.log(`Player ${currentPlayer} wins!`);
                gameActive = false;
            } else if (gameBoard.every(cell => cell !== " ")) {
                printBoard();
                console.log("It's a draw!");
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === "x" ? "o" : "x";
            }
        }
    } else {
        console.log("Invalid position, enter a number between 0 and 8.");
    }
}
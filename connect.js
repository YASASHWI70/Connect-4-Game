var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;

var rows = 6;
var columns = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5]; // Initialize current column heights

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            // HTML: Create a tile element for each cell in the board
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();  // Giving each tile a unique ID based on row and column
            tile.classList.add('tile');
            tile.addEventListener("click", setPiece);
            document.getElementsByClassName("board")[0].appendChild(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let c = parseInt(coords[1]);
    let r = currColumns[c];

    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;  // Set the piece on the board
    let tile = document.getElementById(r.toString() + "-" + c.toString());

    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    currColumns[c] = r - 1;  // Update the row index for the column

    checkWinner();
}

function checkWinner() {
    // Horizontal Check
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] &&
                    board[r][c + 1] == board[r][c + 2] &&
                    board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c, "horizontal");
                    return;
                }
            }
        }
    }

    // Vertical Check
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] &&
                    board[r + 1][c] == board[r + 2][c] &&
                    board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c, "vertical");
                    return;
                }
            }
        }
    }

    // Diagonal Check (Down-Right)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] &&
                    board[r + 1][c + 1] == board[r + 2][c + 2] &&
                    board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c, "down-right");
                    return;
                }
            }
        }
    }

    // Diagonal Check (Down-Left)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 3; c < columns; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c - 1] &&
                    board[r + 1][c - 1] == board[r + 2][c - 2] &&
                    board[r + 2][c - 2] == board[r + 3][c - 3]) {
                    setWinner(r, c, "down-left");
                    return;
                }
            }
        }
    }
}

function setWinner(r, c, direction) {
    let winner = document.getElementById('winner');
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins!";
    } else {
        winner.innerText = "Yellow Wins!";
    }

    gameOver = true;

    // Highlight winning pieces based on the direction of the win
    for (let i = 0; i < 4; i++) {
        let tile;
        if (direction == "horizontal") {
            tile = document.getElementById(r.toString() + "-" + (c + i).toString());
        } else if (direction == "vertical") {
            tile = document.getElementById((r + i).toString() + "-" + c.toString());
        } else if (direction == "down-right") {
            tile = document.getElementById((r + i).toString() + "-" + (c + i).toString());
        } else if (direction == "down-left") {
            tile = document.getElementById((r + i).toString() + "-" + (c - i).toString());
        }
        tile.classList.add('win-highlight');
    }
}
const board = document.getElementById('board');
let currentPlayer = 'X';
let gameOver = false;

function handleMove(cell) {
    if (!cell.textContent && !gameOver) {
        cell.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const cells = document.querySelectorAll('.grid-container button');
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].style.backgroundColor = 'green';
            cells[b].style.backgroundColor = 'green';
            cells[c].style.backgroundColor = 'green';
            gameOver = true;
            const winner = cells[a].textContent;
            setTimeout(() => {
               alert(`Player ${winner} wins!`);
           }, 200);
            return;
        }
    }
}

function createGrid() {
    for (let i = 0; i < 9; i++) {
        const button = document.createElement('button');
        button.addEventListener('click', () => handleMove(button));
        board.appendChild(button);
    }
}

createGrid();

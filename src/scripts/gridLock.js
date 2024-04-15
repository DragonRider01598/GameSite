var currentPlayer = 0;
var totalPlayers = 2;
var clicks = 0;
var colour = ['#0000FF', '#FF0000', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF'];
var muted = ['#8a8cff', '#ff8a8a', '#8aff8a', '#ffffb3', '#ff8aff', '#8affff'];
var adjacentIndices = [
    { row: 0, col: 0 },
    { row: -1, col: 0 },
    { row: +1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: +1 }
];

function setupPlayers() {
    var playerCount = parseInt(document.getElementById('playerCountInput').value);
    if (isNaN(playerCount) || playerCount < 1 || playerCount > 6) {
        alert("Only 2 to 6 players can play the game");
        return;
    }
    totalPlayers = playerCount;
    document.querySelector('#playerCountContainer').style.display = 'none';
    document.querySelector('.button-container').style.display = 'block';
    document.querySelector('.grid-container').style.display = 'flex';
}

function buttonClicked(i, j) {
    var buttons = document.querySelectorAll('.button-container button');

    var clickedButton = document.querySelector('.button-container button[data-row="' + i + '"][data-col="' + j + '"]');
    clickedButton.onclick = null;

    adjacentIndices.forEach(function (index) {
        var adjacentButton = document.querySelector('.button-container button[data-row="' + (index.row + i) + '"][data-col="' + (index.col + j) + '"]');
        if (adjacentButton && index.row == 0 && index.col == 0) {
            adjacentButton.style.backgroundColor = colour[currentPlayer];
            adjacentButton.style.border = '2px solid black';
        } else if (adjacentButton && adjacentButton.style.border == '2px solid black') {
            adjacentButton.style.backgroundColor = colour[currentPlayer];
        } else if (adjacentButton) {
            adjacentButton.style.backgroundColor = muted[currentPlayer];
        }
    });

    currentPlayer = (currentPlayer + 1) % totalPlayers;
    clicks += 1;

    if (clicks >= 81) {
        var colorCounts = {};
        buttons.forEach(function (button) {
            var color = button.style.backgroundColor;
            if (color !== '') {
                colorCounts[color] = (colorCounts[color] || 0) + 1;
            }
        });

        var sortedColorCounts = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);

        document.querySelector('.grid-container').style.display = 'none';

        var scoreDiv = document.createElement('div');
        scoreDiv.className = 'score-container';

        var message = "<h2>Scores</h2>";
        sortedColorCounts.forEach(function (entry) {
            var color = entry[0];
            var tilesCaptured = entry[1];
            message += "<p style='background-color:" + color + ";'>Tiles Captured: " + tilesCaptured + "</p>";
        });
        scoreDiv.innerHTML = message;

        document.body.appendChild(scoreDiv);
    }
}

function createButtonMatrix(container, rows, cols) {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var button = document.createElement('button');
            button.innerText = '';
            button.dataset.row = i;
            button.dataset.col = j;
            button.onclick = function () {
                buttonClicked(parseInt(this.dataset.row), parseInt(this.dataset.col));
            };
            container.appendChild(button);
        }
        container.appendChild(document.createElement('br'));
    }
}

const container = document.querySelector('.button-container');
createButtonMatrix(container, 9, 9);

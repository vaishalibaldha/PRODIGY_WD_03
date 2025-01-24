// Game State
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
let gameState = Array(9).fill(null);
let isGameActive = true;

// Winning Conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Functions
function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (gameState[index] || !isGameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    isGameActive = false;
  } else if (gameState.every(cell => cell)) {
    statusText.textContent = "It's a Tie!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  return winningConditions.some(condition =>
    condition.every(index => gameState[index] === currentPlayer)
  );
}

function resetGame() {
  gameState.fill(null);
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player X's Turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

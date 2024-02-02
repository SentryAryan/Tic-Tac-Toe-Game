const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

// initial state
let winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
initGame();

//a function to initialise the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //Make the boxes on UI empty
  boxes.forEach((box, index) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
    //one more thing = remove green background from winner's boxes
    box.classList.remove("win");
    // or we can rewrite class list of box as =
    // box.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// swap turn functions
function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  //UI update
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

//Check if game is over
function checkGameOver() {
  winningPositions.forEach((position) => {
    // if all winning combination boxes have O or all winning combination boxes
    // have X means if position 0's element = position 1's element = position 2's
    // element
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[1]] !== "" &&
      gameGrid[position[2]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // add green background to each winning position box
      position.forEach((pos) => {
        boxes[pos].classList.add("win");
      });

      // make every box unclickabe since game has finished with win outcome
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // update UI and display winner's name
      gameInfo.innerText = `Winner Player - ${gameGrid[position[0]]}`;

      // make new game button visible since game has finished with win outcome
      newGameBtn.classList.add("active");
    }
  });

  // if we reach here meaning the no winning combination has all X or all O means no win
  // now check if all boxes are filled if yes then game is tied since winning condition
  // is also not reached
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });

  // fillCount = 9 indicates all boxes are filled
  if (fillCount === 9) {
    // Update the UI that game has tied
    gameInfo.innerText = "Game Tied !";
    // display new game button since game has finished
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap the turn
    swapTurn();
    //check if someone won or not
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);

const section = document.querySelector("section");
const boardSection = document.querySelector(".board");

let board = ["", "", "", "", "", "", "", "", ""];

const playerO = createPlayer("O");
const playerX = createPlayer("X");
const playerMe = createPlayer("x");
const computerPlayer = createPlayer("O");

function createPlayer(name) {
  return {
    name: name,
  };
}

const gameBoard = (() => {
  const playerBtnX = document.createElement("button");
  playerBtnX.innerText = "Player X";

  const playerBtnO = document.createElement("button");
  playerBtnO.innerText = "Player O";

  const computerPlayerBtn = document.createElement("button");
  computerPlayerBtn.innerText = "Computer Player";

  const resetBtn = document.createElement("button");
  resetBtn.innerText = "Reset game";

  const info = document.createElement("div");
  info.innerText =
    "This is a game for two players. To start the game the first player needs to choose either Player X or Player O";

  const displayBoard = () => {
    board.forEach(function (item, index) {
      let elem = document.createElement("div");
      elem.innerText = item;
      boardSection.appendChild(elem).setAttribute("class", "element");
      elem.setAttribute("id", index);
    });
    section.appendChild(info).setAttribute("class", "info");
    section.appendChild(playerBtnX).setAttribute("class", "player-btn");
    section.appendChild(playerBtnO).setAttribute("class", "player-btn");
    section.appendChild(computerPlayerBtn).setAttribute("class", "player-btn");
    section.appendChild(resetBtn).setAttribute("class", "reset-btn");
  };

  //update board during game
  const updateBoard = (index, elem) => {
    board[index] = elem;
  };

  const _resetGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];

    const winningElem = document.querySelectorAll(".element-winning");
    if (winningElem !== undefined) {
      winningElem.forEach((elem) => {
        elem.setAttribute("class", "element");
      });
    }

    const evenElem = document.querySelectorAll(".element-even");
    if (evenElem !== undefined) {
      evenElem.forEach((elem) => {
        elem.setAttribute("class", "element");
      });
    }

    const boardElem = document.querySelectorAll(".element");
    boardElem.forEach((elem) => {
      elem.innerText = "";
    });
  };

  playerBtnO.addEventListener("click", () => {
    theGame.playGame(playerO);
  });

  playerBtnX.addEventListener("click", () => {
    theGame.playGame(playerX);
  });

  computerPlayerBtn.addEventListener("click", () => {
    theGame.playGame(computerPlayer);
    section.removeChild(playerBtnO);
  });

  resetBtn.addEventListener("click", () => {
    _resetGame();
  });

  return {
    updateBoard,
    displayBoard,
  };
})();

const theGame = (() => {
  const winningCombos = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  const _checkSame = (boardArray) => {
    let sameElem = 1;
    for (let i = 0; i < winningCombos.length; i++) {
      for (let j = 0; j < 2; j++) {
        if (boardArray[winningCombos[i][j]] !== "") {
          if (
            boardArray[winningCombos[i][j]] ===
            boardArray[winningCombos[i][j + 1]]
          ) {
            sameElem++;
          }
        }
      }
      if (sameElem < 3) {
        sameElem = 1;
      } else if (sameElem === 3) {
        return winningCombos[i];
      }
    }
    return false;
  };

  const _computeNextCompMove = (boardArray) => {
    let sameElem = 1;
    let myArray = [];
    for (let i = 0; i < winningCombos.length; i++) {
      for (let j = 0; j < 2; j++) {
        if (boardArray[winningCombos[i][j]] === "O") {
          if (
            boardArray[winningCombos[i][j]] ===
              boardArray[winningCombos[i][j + 1]] ||
            boardArray[winningCombos[i][j]] ===
              boardArray[winningCombos[i][j + 2]]
          ) {
            sameElem++;
          }
        }
      }
      if (sameElem === 2) {
        myArray = winningCombos[i];
        for (let k = 0; k < 2; k++) {
          if (boardArray[myArray[k]] === "") {
            return myArray[k];
          }
        }
      }
    }
    return false;
  };

  const _checkIfGameOver = () => {
    const elem = document.querySelectorAll(".element");
    let countEmptyFields = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        countEmptyFields++;
      }
    }
    if (countEmptyFields === 0) {
      elem.forEach((e) => {
        e.setAttribute("class", "element-even");
      });
    }
  };

  const _markWinningLine = () => {
    const getElem = document.querySelectorAll(".element");
    const winningLine = _checkSame(board);
    for (let i = 0; i < winningLine.length; i++) {
      for (let j = 0; j < getElem.length; j++) {
        if (winningLine[i] == getElem[j].id) {
          getElem[j].setAttribute("class", "element-winning");
        }
      }
    }
  };

  const getRandomField = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const computerMove = () => {
    let chosenFieldId = board.indexOf("");
    let selectedField = document.getElementById(chosenFieldId);
    selectedField.innerText = "O";
    gameBoard.updateBoard(chosenFieldId, "O");
  };

  const playGame = (player) => {
    if (player === computerPlayer) {
      computerMove();
      player = playerMe;
    }

    const playerMove = (event) => {
      if (event.target.innerText === "") {
        event.target.innerText = player.name;
        gameBoard.updateBoard(event.target.id, event.target.innerText);
      }

      if (player === playerX) {
        player = playerO;
      } else if (player === playerO) {
        player = playerX;
      } else if (player === playerMe) {
        computerMove();
      }
      if (_checkSame(board)) {
        _markWinningLine();
        boardSection.removeEventListener("click", playerMove);
      }

      _checkIfGameOver();
    };

    boardSection.addEventListener("click", playerMove);
  };

  return {
    playGame,
  };
})();

gameBoard.displayBoard();

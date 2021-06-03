const section = document.querySelector('section')
const boardSection = document.querySelector('.board');

let board = ['','','','','','','','',''];

const gameBoard = (()=>{

    const playerBtnX = document.createElement('button');
    playerBtnX.innerText = 'Player X';

    const playerBtnO = document.createElement('button');
    playerBtnO.innerText = 'Player O';

    const clearBtn = document.createElement('button');
    clearBtn.innerText = 'Clear board'


    const updateBoard = (index, elem) => {
        board[index] = elem;
        console.log(board)
    }
    const displayBoard = () => {
    board.forEach(function(item, index){
        let elem = document.createElement('div');
        elem.innerText = item;
        boardSection.appendChild(elem).setAttribute('class', 'element');
        elem.setAttribute('id', index);
    })
    section.appendChild(playerBtnX);
    section.appendChild(playerBtnO);
    section.appendChild(clearBtn);
   }

   const displayScore = (winner, score) => {
        let scoreBoard = document.createElement('div');
        scoreBoard.setAttribute('id', 'score-board');

        let pX = document.createElement('div');
        pX.innerText = 'Player X Score: ' + score;
        let pO = document.createElement('div');
        pO.innerText = 'Player O Score: ' + score

        section.appendChild(scoreBoard);
        scoreBoard.appendChild(pX);
        scoreBoard.appendChild(pO);
    }

    playerBtnO.addEventListener('click', () => {
        playGame(playerO)
    });

    playerBtnX.addEventListener('click', () => {
        playGame(playerX)
    });

    clearBtn.addEventListener('click', () => {
        board = ['','','','','','','','',''];
        let boardElem = document.querySelectorAll('.element');
        boardElem.forEach((elem) => {
            elem.innerText = '';
        })
    })


   return {
        updateBoard,
        displayBoard,
        displayScore
   };
})();


gameBoard.displayBoard();
gameBoard.displayScore();


function player(name, turn){
    return {
        name: name,
        turn: turn,
        totalScore: 0
    }
}


//current turn - 1
//not my turn - 0

const playerO = player('O', 0)
const playerX = player('X', 0)

const playGame = (player) => {
    boardSection.addEventListener('click', (event) => {
        if(event.target.innerText === ''){
            event.target.innerText = player.name;
            if(player === playerO){
                playerO.myTurn = 1;
                playerX.myTurn = 0;
                player = playerX;
            } else if(player === playerX){
                playerX.myTurn = 1;
                playerO.myTurn = 0;
                player = playerO;
            }
            gameBoard.updateBoard(event.target.id, event.target.innerText)
        }
       if(checkFields(board)){
          if(playerO.myTurn === 1){
            playerO.totalScore ++
          } else if(playerX.myTurn === 1){
            playerX.totalScore ++
          }
       }

    }) 

}

const getRows = (array) => {
    let rows = [];
    for(let i=0; i<array.length -1; i++){
      let singleRow = [];
        for(let j=0; j<3; j++){
            singleRow.push(array[i+j])
        }
        rows.push(singleRow)
        i=i+2
    }
  return rows
}

const getColumns = (array) => {
  let columns = [];
  for(let i=0; i<3; i++){
    let singleColumn = [];
    for(let j=0; j<3;j++){
      singleColumn.push(array[i+(j*3)])
    }
    columns.push(singleColumn)
  }
  return columns
}


const getDiagonals = (array) => {
  let diagonals = [];
  let firstDiagonal = [];
  let secondDiagonal = [];
  for(let i=0; i<array.length; i++){
    firstDiagonal.push(array[i]);
    i = i + 3
  }
  for(let j=2; j<array.length-1; j++){
    secondDiagonal.push(array[j])
    j = j+1
  }
  diagonals.push(firstDiagonal, secondDiagonal);
  return diagonals
}

const checkSame = (array) => {
    let sameElem = 1;

      for(let i = 0; i < array.length; i++){
           for(let j = 0; j<2; j++){
           if(array[i][j] !== ''){
              if(array[i][j] === array[i][j+1]){
                sameElem ++
              }
            }
          }
        if(sameElem < 3){
          sameElem = 1;
        } else if(sameElem === 3) {
          break;
        }
     }
    if(sameElem === 3){
        return true
    } 
    else {
        return false
    }
}


const checkFields = (array) => {
    let checkRows = checkSame(getRows(array));
    let checkColums = checkSame(getColumns(array));
    let checkDiagonals = checkSame(getDiagonals(array));
    if(checkRows === true || checkColums === true || checkDiagonals === true){
      return true
    } else {
        return false
    }
}



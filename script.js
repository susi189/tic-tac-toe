const section = document.querySelector('section')
const boardSection = document.querySelector('.board');

let board = ['','','','','','','','',''];

const gameBoard = (()=>{

    let playerBtnX = document.createElement('button');
    playerBtnX.innerText = 'Player X';

    let playerBtnO = document.createElement('button');
    playerBtnO.innerText = 'Player O';


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
   }

   const displayScore = () => {
        let scoreBoard = document.createElement('div');
        scoreBoard.setAttribute('id', 'score-board');

        let pX = document.createElement('div');
        pX.innerText = 'Player X Score: '
        let pO = document.createElement('div');
        pO.innerText = 'Player O Score: '

        section.appendChild(scoreBoard);
        scoreBoard.appendChild(pX);
        scoreBoard.appendChild(pO);
    }

    playerBtnO.addEventListener('click', () => {
        playGame(playerO)
    })

    playerBtnX.addEventListener('click', () => {
        playGame(playerX)
    })

   return {
        updateBoard,
        displayBoard,
        displayScore
   };
})();


gameBoard.displayBoard();
gameBoard.displayScore();


function Player(name){
    const getName = () => name;
    return {getName}
}

const playerO = Player('O')
const playerX = Player('X')

const playGame = (player) => {
    boardSection.addEventListener('click', (event) => {
        if(event.target.innerText === ''){
            event.target.innerText = player.getName();
            if(player === playerO){
                player = playerX;
            } else if(player === playerX){
                player = playerO;
            }
            gameBoard.updateBoard(event.target.id, event.target.innerText)
        }
    }) 
}



const clearFields = () => {
    
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
      return "done"
    } else {
      return 'even'
    }
}

checkFields(board)


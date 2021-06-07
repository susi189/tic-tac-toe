const section = document.querySelector('section')
const boardSection = document.querySelector('.board');

let board = ['','','','','','','','',''];

const playerO = createPlayer('O')
const playerX = createPlayer('X')

const gameBoard = (()=>{

    const playerBtnX = document.createElement('button');
    playerBtnX.innerText = 'Player X';

    const playerBtnO = document.createElement('button');
    playerBtnO.innerText = 'Player O';

    const resetBtn = document.createElement('button');
    resetBtn.innerText = 'Reset game'

    const displayBoard = () => {
        board.forEach(function(item, index){
            let elem = document.createElement('div');
            elem.innerText = item;
            boardSection.appendChild(elem).setAttribute('class', 'element');
            elem.setAttribute('id', index);
        })
        section.appendChild(playerBtnX).setAttribute('class', 'player-btn');
        section.appendChild(playerBtnO).setAttribute('class', 'player-btn');
        section.appendChild(resetBtn).setAttribute('class', 'reset-btn');
    }

    //update board during game
    const updateBoard = (index, elem) => {
        board[index] = elem;
    }

    const resetGame = () => {
        const winningElem = document.querySelectorAll('.element-winning');
        if(winningElem !== undefined) {
         winningElem.forEach((elem) => {
            elem.setAttribute('class', 'element')
        });   
        }
        board = ['','','','','','','','',''];
        let boardElem = document.querySelectorAll('.element');
        boardElem.forEach((elem) => {
            elem.innerText = '';
        })
    }

    playerBtnO.addEventListener('click', () => {
        playGame(playerO)
    });

    playerBtnX.addEventListener('click', () => {
        playGame(playerX)
    });

    resetBtn.addEventListener('click', () => {
       resetGame();
    });

   return {
        updateBoard,
        displayBoard
   };
})();


function createPlayer(name){
    return {
        name: name,
        winner: 1
    }
}


const playGame = (player) => {
    boardSection.addEventListener('click', function play(event) {
        let currentPlayer = player;
        if(event.target.innerText === ''){
            event.target.innerText = player.name;
            gameBoard.updateBoard(event.target.id, event.target.innerText)
            if(player === playerO){
                player = playerX
            } else if( player === playerX){
                player = playerO
            }
        } 
        if(checkSame(board)){
           currentPlayer.winner = 1;
           markWinningLine();
           declareWinner(currentPlayer);
           boardSection.removeEventListener('click', play)
        }
    });
}

const declareWinner = (currentPlayer) => {
    const banner = document.createElement('div');
    banner.setAttribute('id', 'announcement');

    if(currentPlayer.winner = 1){
        banner.innerText = 'The Winner is ..... ' + currentPlayer.name;
    } else {
        banner.innerText = 'Even'
    }
    section.appendChild(banner)
}

const markWinningLine = () => {
    const getElem = document.querySelectorAll('.element');
    const winningLine = checkSame(board);
    for(let i = 0; i < winningLine.length; i++){
        for(let j = 0; j < getElem.length; j++){
            if(winningLine[i] == getElem[j].id){
                getElem[j].setAttribute('class', 'element-winning');
            }
        }
    }
    
}

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
[2, 4, 6]

];

const checkSame = (boardArray) => {
    let sameElem = 1;
      for(let i = 0; i < winningCombos.length; i++){
           for(let j = 0; j < 2; j++){
           if(boardArray[winningCombos[i][j]] !== ''){
              if(boardArray[winningCombos[i][j]] === boardArray[winningCombos[i][j+1]]){
                sameElem ++
              }
            }
          }
        if(sameElem < 3){
          sameElem = 1;
        } else if(sameElem === 3) {
          return winningCombos[i]
        } 
     }
     return false 
}


gameBoard.displayBoard();

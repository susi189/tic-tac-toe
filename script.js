const section = document.querySelector('section')
const boardSection = document.querySelector('.board');

let board = ['','','','','','','','',''];

const playerO = createPlayer('O')
const playerX = createPlayer('X')

function createPlayer(name){
    return {
        name: name,
        winner: 1
    }
}

const gameBoard = (()=>{

    const playerBtnX = document.createElement('button');
    playerBtnX.innerText = 'Player X';

    const playerBtnO = document.createElement('button');
    playerBtnO.innerText = 'Player O';

    const resetBtn = document.createElement('button');
    resetBtn.innerText = 'Reset game'
    
    const info = document.createElement('div');
    info.innerText = 'To start a game choose a player'

    const displayBoard = () => {
        board.forEach(function(item, index){
            let elem = document.createElement('div');
            elem.innerText = item;
            boardSection.appendChild(elem).setAttribute('class', 'element');
            elem.setAttribute('id', index);
        })
        section.appendChild(info).setAttribute('class', 'info');
        section.appendChild(playerBtnX).setAttribute('class', 'player-btn');
        section.appendChild(playerBtnO).setAttribute('class', 'player-btn');
        section.appendChild(resetBtn).setAttribute('class', 'reset-btn');
    }

    //update board during game
    const updateBoard = (index, elem) => {
        board[index] = elem;
    }

    const _resetGame = () => {
        const announcement = document.getElementById('announcement')
        board = ['','','','','','','','',''];

        const winningElem = document.querySelectorAll('.element-winning');
        if(winningElem !== undefined) {
         winningElem.forEach((elem) => {
            elem.setAttribute('class', 'element')
        });   
        }

        let boardElem = document.querySelectorAll('.element');
        boardElem.forEach((elem) => {
            elem.innerText = '';
        });

        playerO.winner = 0;
        playerX.winner = 0;

        section.removeChild(announcement);

    }

    playerBtnO.addEventListener('click', () => {
        theGame.playGame(playerO)
    });

    playerBtnX.addEventListener('click', () => {
        theGame.playGame(playerX)
    });

    resetBtn.addEventListener('click', () => {
       _resetGame();
    });

   return {
        updateBoard,
        displayBoard,
   };
})();


const theGame = (()=> {
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

    const _checkSame = (boardArray) => {
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

    const _declareWinner = (currentPlayer) => {
        const banner = document.createElement('div');
        banner.setAttribute('id', 'announcement');

        if(currentPlayer.winner = 1){
            banner.innerText = 'The Winner is ..... Player ' + currentPlayer.name;
        } else {
            banner.innerText = 'Even'
        }
        section.appendChild(banner)
    }

    const _markWinningLine = () => {
        const getElem = document.querySelectorAll('.element');
        const winningLine = _checkSame(board);
        for(let i = 0; i < winningLine.length; i++){
            for(let j = 0; j < getElem.length; j++){
                if(winningLine[i] == getElem[j].id){
                    getElem[j].setAttribute('class', 'element-winning');
                }
            }
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
            if(_checkSame(board)){
                currentPlayer.winner = 1;
                _markWinningLine();
                _declareWinner(currentPlayer);
                boardSection.removeEventListener('click', play);
            }
        });
    }

    return {
        playGame
    }

})();


gameBoard.displayBoard();

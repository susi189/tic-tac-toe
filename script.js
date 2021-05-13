const boardSection = document.querySelector('.board');

const gameBoard = (()=>{
    let board = ['','','','','','','','',''];
    const createBoard = () => {
       //the board will be an aray of divs
    board.forEach(function(item){
        let elem = document.createElement('div');
        elem.innerText = item;
        boardSection.appendChild(elem).setAttribute('id', 'element');
    })
   }
   return {
       createBoard
   };
})();

gameBoard.createBoard()

// lastTurn -> 
// 0 have not played
// 1 just had a turn

function Player(name, lastTurn){
    const getName = () => name;
    const getTurn = () => lastTurn;

    return {getName, getTurn}
}

const playerO = Player('O', 0)
const playerX = Player('X', 0)

const playGame = (player) => {
    boardSection.addEventListener('click', (event) => {
        if(event.target.innerText === ''){
            if(player === playerO){
                event.target.innerText = 'O';
                player = playerX;
            } else if(player === playerX){
                event.target.innerText = 'X';
                player = playerO;
            }
        }
        
    })
}

const checkTheFields = (array) => {
    
}

const clearFields = () => {
    
}

playGame(playerO)
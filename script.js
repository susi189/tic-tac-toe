const boardSection = document.querySelector('.board');

const gameBoard = (()=>{
    let board = ['','','','','','','','',''];
    const displayBoard = () => {
    board.forEach(function(item, index){
        let elem = document.createElement('div');
        elem.innerText = item;
        boardSection.appendChild(elem).setAttribute('class', 'element');
        elem.setAttribute('id', index);
    })
   }
   return {
        displayBoard
   };
})();


gameBoard.displayBoard();

// lastTurn -> 
// 0 have not played
// 1 just had a turn

function Player(name){
    const getName = () => name;

    return {getName}
}

const playerO = Player('O')
const playerX = Player('X')

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
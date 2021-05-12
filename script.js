const board = document.querySelector('.board');

const gameBoard = (()=>{
   const createBoard = () => {
       //the board will be an aray of divs
    let board = [];
    let elem = 'o';
    for(let i = 0; i<9; i++){
        board.push(elem)
    }
    return board
   }
   return {
       createBoard
   };
})();

function Player(name, lastTurn){
    const getName = () => name;
    const getTurn = () => lastTurn;

    return {getName, getTurn}
}

const playGame = (player1, player2) => {

}
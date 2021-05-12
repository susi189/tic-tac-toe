const boardSection = document.querySelector('.board');

const gameBoard = (()=>{
   const createBoard = () => {
       //the board will be an aray of divs
    let board = ['x','o','x','x','o','x','o','x','x'];
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

gameBoard.createBoard();

function Player(name, lastTurn){
    const getName = () => name;
    const getTurn = () => lastTurn;

    return {getName, getTurn}
}

const playGame = (player1, player2) => {

}
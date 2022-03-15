const boxes =Array.from(document.querySelectorAll('.box'));
const playerTurn = document.getElementById('player-turn');
const displayResult = document.getElementById('display-result');
const resetBtn = document.getElementById('reset-btn');

let board = ['', '', '', '', '', '', '', '', ''];

const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameOver = false;
let roundsLeft = 9;
let currentPlayer = 'X';

boxes.forEach((box, index) => {

    box.addEventListener('click', () => {
        box.innerHTML = currentPlayer;
        board[index] = currentPlayer;
        box.style.pointerEvents = 'none';
        roundsLeft -=1;

        checkWinner();

        if (gameOver == true){
            boxes.forEach((box) =>{
                box.style.pointerEvents = 'none';
                playerTurn.innerHTML = "";
            });
        }
        if (gameOver ==false){
            changePlayer(currentPlayer);
        }
    });
});

function checkWinner(){
    let checkWin = false;
    for (let i=0; i<=7; i++){
        const roundWon = winCondition[i];
        const a = board[roundWon[0]];
        const b = board[roundWon[1]];
        const c = board[roundWon[2]];
        if (a === '' || b === '' || c === ''){
            continue;
        }
        if (a === b && b===c){
            checkWin=true;
            break;
        }
    }

    let xWon = false;
    let oWon = false;
    let Tie = false;

    const announce = (type => {
        switch (type){
            case xWon:
                displayResult.innerHTML = "Player X won!"
                break;
            case oWon:
                displayResult.innerHTML = "Player O won!"
                break;
            case Tie:
                displayResult.innerHTML= "Tie!";
                break
        }
    });

    if (checkWin){
        announce(currentPlayer === 'X' ? xWon=true : oWon=true);
        gameOver = true;
        return;
    }

    if (!board.includes ('')){
        gameOver = true;
        announce (Tie = true);
    }
}

function changePlayer(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn.innerHTML = "Turn: " + currentPlayer;
}

resetBtn.addEventListener('click', () =>{
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X'
    playerTurn.innerHTML = "Turn: " + currentPlayer;
    displayResult.innerHTML = "";
    roundsLeft = 9;
    gameOver = false;
    boxes.forEach((box) => {
        box.innerHTML = '';
        box.style.pointerEvents = 'auto';
    });
});
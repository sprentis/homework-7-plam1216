let player1 = 'X';
let player2 = 'O';

let winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

let boxes = document.querySelectorAll(".box");

start();

function start(){
    document.querySelector(".finished").style.display="none";
    board = Array.from(Array(9).keys());
    for (var i = 0; i < boxes.length; i++){
        boxes[i].innerText = '';
        boxes[i].style.removeProperty('background-color');
        boxes[i].addEventListener('click', checkBox, false);
    }
}

function checkBox(box){
    if(typeof board[box.target.id] == 'number'){
        turn(box.target.id, player1);
        if(!tie()) {turn(nextSpot(), player2);}
    }
}

function turn(boxId, player){
    board[boxId] = player;
    document.getElementById(boxId).innerText = player;
    let gameWon = checkWin(board, player);
    if (gameWon) gameOver(gameWon)
}

function emptySquare(){
    return board.filter(s => typeof s == 'number')
}

function nextSpot(){
    return emptySquare()[0];
}

function checkWin(board, player){
    let plays = board.reduce((x,y,index) => (y===player) ? 	x.concat(index) : x, []);
    let gameWon = null;
    for (let [index, win] of winningCombos.entries()){
        if (win.every(elem => plays.indexOf(elem)>-1)){
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for (let index of winningCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor=
            gameWon.player === player1 ? "green" : "green";
    }
    for(var i = 0; i < boxes.length; i++){
        boxes[i].removeEventListener('click', checkBox, false);
    }
}

function tie(){
    if (checkWin === null || emptySquare().length == 0){
        for(var i = 0; i < boxes.length; i++){
            boxes[i].style.backgroundColor = "red";
            boxes[i].removeEventListener('click', checkBox, false);
        }
        return true;
    }
    return false;
}
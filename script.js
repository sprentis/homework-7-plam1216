// let board;
let player1 = 'X';
let player2 = 'O';

const winCombo = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

let boxes = document.querySelectorAll(".box");
start();

function start(){
    document.querySelector(".result").style.display="none";
    //gives the boxes a number
    board = Array.from(Array(9).keys());
    //clears each box and adds event listener
    for (var i = 0; i < boxes.length; i++){
        boxes[i].innerText = '';
        boxes[i].style.removeProperty('background-color');
        boxes[i].addEventListener('click', filledSquare, false);
    }
}

function emptySquare(){
    return board.filter(s => typeof s == 'number')
}

function filledSquare(box){
    if(typeof board[box.target.id] == 'number'){
        turn(box.target.id, player1);
        if(!tie()) {turn(nextTurn(), player2);}
    }
}

function turn(boxId, player){
    board[boxId] = player;
    document.getElementById(boxId).innerText = player;
    let gameWon = checkWin(board, player);
    if (gameWon) gameOver(gameWon)
}

function nextTurn(){
    //first box thats not empty
    return emptySquare()[0];
}

function checkWin(board, player){
    let plays = board.reduce((x,y,index) => (y === player) ? x.concat(index) : x, []);
    let gameWon = null;
    for (let [index, win] of winCombo.entries()){
        if (win.every(elem => plays.indexOf(elem)>-1)){
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for (let index of winCombo[gameWon.index]){
        document.getElementById(index).style.backgroundColor=
            gameWon.player === player1 ? "green" : "blue";
    }
    for(var i = 0; i < boxes.length; i++){
        boxes[i].removeEventListener('click', filledSquare, false);
    }
    result(gameWon.player === player1 ? "You Won!" : "You Lost!");
}

function result(winner){
    document.querySelector(".result").style.display = "block";
    document.querySelector(".result.text").innerText = winner;
}

function tie(){
    if (checkWin === null || emptySquare().length == 0){
        for(var i = 0; i < boxes.length; i++){
            boxes[i].style.backgroundColor = "red";
            boxes[i].removeEventListener('click', filledSquare, false);
        }
        result("Tie Game!");
        return true;
    }
    return false;
}
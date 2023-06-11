const numBoard = document.getElementById('numBoard');
const bat = document.getElementById('bat');
const score = document.getElementById('score');

const boxs = document.getElementsByClassName('box');
const tryNo = document.getElementById('try');
const start = document.getElementById('start');
const winnerBoard = document.getElementById('winnerBoard');

const warning = document.getElementById('warning');


let tryingNo = 0;

let boxDataNo = [];
let changeAnimeStopIds = [];
let scoreValue;

//------------------------------------------------------------------------
//------------------------------------------------------------------------
                        //game logic

const gameData = ['A','B','F','G','K','P']

function gameInti(){
    for(let box of boxs) {
        box.innerText = gameData[0];
    }
    tryNo.innerText = '0'
    score.innerText = '250'
}

gameInti()


function statusCheck(){
    if(boxDataNo[0] === boxDataNo[1] && boxDataNo[1] === boxDataNo[2]){
        winnerBoard.innerText = 'You Win !!!'
        winnerBoard.style.background = 'rgb(71, 255, 129)'

        scoreValue = Number(score.innerText) + Number(bat.innerText);
        score.innerText = scoreValue;

        bat.innerText = '0';
        
    }else {
        winnerBoard.innerText = 'You lose !!!'
        winnerBoard.style.background = 'rgb(255, 27, 27)'

        scoreValue = Number(score.innerText) - Number(bat.innerText);
        score.innerText = scoreValue;

        bat.innerText = '0';

        if(Number(score.innerText) <= 0){
            warning.classList.remove('display')
            warning.innerText = "Bank Craft !!!!"
        }
    }
}

function gameStart(){

    if(Number(bat.innerText) > Number(score.innerText)){
        console.log("it's to much")
        warning.classList.remove('display')
        warning.innerText = "you don't have enough money !!!"
        setTimeout(()=>{
            warning.classList.add('display')
        },1000)

        return
    }


    if(!Number(bat.innerText)){
        console.log('you need to bat on some money')
        warning.classList.remove('display')
        setTimeout(()=>{
            warning.classList.add('display')
        },1000)
        return;
    }

    setTimeout(()=>{
        start.addEventListener('click', gameStart);
        statusCheck(); 
        start.innerText = 'Start'
    },3000)

    start.removeEventListener('click', gameStart);
    start.innerText = 'Wait...'

    winnerBoard.innerText = '...'
    winnerBoard.style.background = 'tomato'

    tryingNo ++;
    tryNo.innerText = tryingNo;

    if(tryingNo % 5 === 0){
        let luckyNo = Math.floor(Math.random() * 6);
        // for(let box of boxs) {
        //     box.innerText = gameData[luckyNo];
        // }

        boxDataNo = [];
        boxDataNo.push(luckyNo);
        boxDataNo.push(luckyNo);
        boxDataNo.push(luckyNo);

        // console.log(boxDataNo)

    }else{
        let box0No = Math.floor(Math.random() * 6);
        let box1No = Math.floor(Math.random() * 6);
        let box2No = Math.floor(Math.random() * 6);

        boxDataNo = [];
        boxDataNo.push(box0No);
        boxDataNo.push(box1No);
        boxDataNo.push(box2No);

        // console.log(boxDataNo)
    }


    for(let boxIndex in boxs) {
        setTimeout(()=>{
            boxs[boxIndex].innerText = gameData[boxDataNo[boxIndex]];
            clearInterval(changeAnimeStopIds[boxIndex]);
        },1000 + (boxIndex  * 1000))
    }


    //for animetion in board containts
    changeAnimeStopIds = [];
    for(let i = 0; i < 3; i++){
        let intervalId = setInterval(()=>{
            let no = Math.floor(Math.random() * 6);
            boxs[i].innerText = gameData[no];
        },100)

        
        changeAnimeStopIds.push(intervalId);
    }
 
}

start.addEventListener('click', gameStart);

//------------------------------------------------------------------------
//------------------------------------------------------------------------


//bat setting through number board
numBoard.addEventListener('click', (e)=>{
    let targetValue = e.target.innerText

    //backpace
    if(targetValue == 'X..'){
        let number = bat.innerText.split('')
        number.pop();

        let numJoin = number.join('');

        if(Number(numJoin) <= 0){
            bat.innerText = '0';
        }else{
            bat.innerText = number.join('')
        }
    }

    //updating you bat
    if(Number(bat.innerText) <= 999){
        if(targetValue == 'X..'){
            return;
        }
        if(bat.innerText == 0) {
            bat.innerText = '';
        }
        bat.innerText += targetValue;

        if(Number(bat.innerText) >= 999){
            bat.innerText = '999';
        }
    }
})



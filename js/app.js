const simonGame = {

attempts: [
    {number: '1/10'},
    {number: '2/10'},
    {number: '3/10'},
    {number: '4/10'},
    {number: '5/10'},
    {number: '6/10'},
    {number: '7/10'},
    {number: '8/10'},
    {number: '9/10'},
    {number: '10/10'},
    {number: 'You Win!'}

],

simonRight: [
    { variant: 'Simon says:'}
],

simonWrong: [
    {variant: ''},
    {variant: 'Siimon says:'},
    {variant: 'simoN says:'},
    {variant: 'Simon yells:'},
    {variant: 'Megan says:'},
    {variant: 'Symon says:'},
    {variant: 'Banana says:'},
    {variant: 'Simon said:'},
    {variant: 'Sinon says:'},
    {variant: 'Simon commands:'},
    {variant: 'Sinan says:'},
    {variant: 'Naty says:'},
    {variant: 'Simon tells:'},
    {variant: 'Simon begs:'},
    {variant: 'Simon sells:'}
],

commandColors: [
    {verb: 'Click the red color!', color: 'red'},
    {verb: 'Click the green color!', color: 'green'},
    {verb: 'Click the blue color!', color: 'blue'},
    {verb: 'Click the yellow color!', color: 'yellow'}
],

commandWrite: [
    {verb: 'Write "dad" below!', word: 'dad'},
    {verb: 'Write "owl" below!', word: 'owl'},
    {verb: 'Write "mad" below!', word: 'mad'},
    {verb: 'Write "hat" below!', word: 'hat'},
    {verb: 'Write "was" below!', word: 'was'}
],

commandFruits: [
    {verb: 'Give me a peach!', fruit: 'peach'},
    {verb: 'Give me a banana!', fruit: 'banana'},
    {verb: 'Give me a pineapple!', fruit: 'pineapple'},
    {verb: 'Give me an eggplant!', fruit: 'eggplant'}
], 
emptyArray: [
    {verb: null},
    {verb: 'no'}
]

}

/*-------------------------------- Constants --------------------------------*/

var isAttemptPassed = false;
var isGameCompleted = false;


/*-------------------------------- Variables --------------------------------*/
//let startTime = new Date().getTime();

let currentTime = 0;
let timerInterval;

let attemptInd = 1;

let attemptDifficulty=0;

let currentColor;
let currentWord;
let currentFruit;

/*------------------------ Cached Element References ------------------------*/

const everyButton = document.querySelectorAll('.everyButton');
const playButton = document.querySelector('#play-button');
const modal = document.querySelector('.modal');

const attemptDisplay = document.querySelector('.attempt');
const simonSaysDisplay = document.querySelector('.simon-says');
const simonActionDisplay = document.querySelector('.simon-action');
const difficultyDisplay = document.querySelector('.difficulty');

const inputWrite = document.querySelector('.inputs');

const gameLostModal = document.querySelector('#game-lost-modal');
const gameWonModal = document.querySelector('#game-won-modal');

const playAgainButton = document.querySelectorAll('.play-again');



/*-------------------------------- Functions --------------------------------*/

function startTimerEasy() {
  currentTime = 0; // Reset the timer to 0
  

  timerInterval = setInterval(() => {
    currentTime++; // Increment the timer value
    console.log(currentTime); 

    if (currentTime >= 6) {
        isAttemptPassed = false;
      clearInterval(timerInterval); // Stop the timer when it reaches 10
      
      console.log("Time's up!");
      isAttemptSuccessful();
    }
    
  }, 1000); // Update every 1000 milliseconds (1 second)
}

function startTimerMedium() {
  currentTime = 0; // Reset the timer to 0
  

  timerInterval = setInterval(() => {
    currentTime++; // Increment the timer value
    console.log(currentTime); 

    if (currentTime >= 4) {
        isAttemptPassed = false;
      clearInterval(timerInterval); // Stop the timer when it reaches 10
      
      console.log("Time's up!");
      isAttemptSuccessful();
    }
    
  }, 1000); // Update every 1000 milliseconds (1 second)
}

function startTimerHard() {
  currentTime = 0; // Reset the timer to 0
  

  timerInterval = setInterval(() => {
    currentTime++; // Increment the timer value
    console.log(currentTime); 

    if (currentTime >= 2) {
        isAttemptPassed = false;
      clearInterval(timerInterval); // Stop the timer when it reaches 10
      
      console.log("Time's up!");
      isAttemptSuccessful();
    }
    
  }, 1000); // Update every 1000 milliseconds (1 second)
}

function startTimerWrong() {
  currentTime = 0; // Reset the timer to 0
  

  timerInterval = setInterval(() => {
    currentTime++; // Increment the timer value
    console.log(currentTime); 

    if (currentTime >= 3) {
        
      clearInterval(timerInterval); // Stop the timer when it reaches 10
      isAttemptPassed = true;
      console.log("You're good!");
        isAttemptSuccessful();

    }
  }, 1000); // Update every 1000 milliseconds (1 second)
}




function stopTimer() {
  clearInterval(timerInterval); // Stop the timer
}

function randomizerSimonWrong() {
    const ind = Math.floor(Math.random() * simonGame.simonWrong.length);
    simonSaysDisplay.textContent = simonGame.simonWrong[ind].variant;
    
}

function randomizerSimonRight(){
    simonSaysDisplay.textContent = simonGame.simonRight[0].variant;
    
}

function RandomSimonCall() {

if(Math.random() < 0.5){
    randomizerSimonRight();
}
else {
    randomizerSimonWrong();
}
    
}

function randomizerColor() {
    const ind = Math.floor(Math.random() * simonGame.commandColors.length);
    
    simonActionDisplay.textContent = simonGame.commandColors[ind].verb;

    currentColor = simonGame.commandColors[ind].color;
}

function randomizerWrite() {
    const ind = Math.floor(Math.random() * simonGame.commandWrite.length);
    simonActionDisplay.textContent = simonGame.commandWrite[ind].verb;

    currentWord = simonGame.commandWrite[ind].word
}

function randomizerFruit() {
    const ind = Math.floor(Math.random() * simonGame.commandFruits.length);
    simonActionDisplay.textContent = simonGame.commandFruits[ind].verb;

    currentFruit = simonGame.commandFruits[ind].fruit;
}

function randomCommandCall() {
    if (Math.random() < 0.33){
        randomizerColor();
    }
    else if(Math.random() >= 0.33 && Math.random() < 0.66){
        randomizerWrite();
    }
    else {
        randomizerFruit();
    }
}

function TimerSimonRight(){
    attemptDifficulty++;
    if(simonSaysDisplay.textContent === simonGame.simonRight[0].variant){
        //console.log('Simon says');
            if (attemptDifficulty === 1 || attemptDifficulty === 2 || attemptDifficulty === 3 || attemptDifficulty === 4){
                    difficultyDisplay.textContent = 'Difficulty: easy';
                    startTimerEasy();
            }

            if (attemptDifficulty === 5 || attemptDifficulty === 6 || attemptDifficulty === 7 || attemptDifficulty === 8){
                    difficultyDisplay.textContent = 'Difficulty: medium';
                    startTimerMedium();
            }
            if (attemptDifficulty === 9 || attemptDifficulty === 10){
                    difficultyDisplay.textContent = 'Difficulty: hard';
                    startTimerHard();
            }
        
    }
    else {
        //console.log('Not Simon says');
        if (attemptDifficulty === 1 || attemptDifficulty === 2 || attemptDifficulty === 3 || attemptDifficulty === 4){
                    difficultyDisplay.textContent = 'Difficulty: easy';
                    startTimerWrong();
            }

            if (attemptDifficulty === 5 || attemptDifficulty === 6 || attemptDifficulty === 7 || attemptDifficulty === 8){
                    difficultyDisplay.textContent = 'Difficulty: medium';
                    startTimerWrong();
            }
            if (attemptDifficulty === 9 || attemptDifficulty === 10){
                    difficultyDisplay.textContent = 'Difficulty: hard';
                    startTimerWrong();
            }
        
    }
}

function clearInputWrite(){
    inputWrite.value = "";
}

function gameLost(){
    gameLostModal.style.display = "block";
}
function gameWon(){
    gameWonModal.style.display = "block";
}

function levelUp(){
    attemptDisplay.textContent = simonGame.attempts[attemptInd++].number;
    RandomSimonCall();
    randomCommandCall();
    TimerSimonRight();
    clearInputWrite();
}



function resetGame(){
    attemptDisplay.textContent = simonGame.attempts[0].number;
    difficultyDisplay.textContent = 'Difficulty: easy'
        RandomSimonCall();
        randomCommandCall();
        attemptInd = 1;
        attemptDifficulty=0;
        isGameCompleted = false;
         TimerSimonRight(); // put it below every function, otherwise it won't contain anything in textContent
         clearInputWrite();

}

function isAttemptSuccessful() {
    if (isAttemptPassed == true) {
        console.log('Next level!');
        levelUp();
        if (attemptDisplay.textContent === 'You Win!'){
            console.log('Game completed!');
            simonSaysDisplay.textContent = '';
            simonActionDisplay.textContent = '';
            difficultyDisplay.textContent = '';
            stopTimer();
            gameWon();
        }
    }
    else {
        console.log('Game over!');
        gameLost();
    }
}



/*----------------------------- Event Listeners -----------------------------*/

playButton.addEventListener("click", () => {
        modal.style.display = "none";
        resetGame();
})

everyButton.forEach(button => {
    button.addEventListener('click', () => {
        if (simonSaysDisplay.textContent === simonGame.simonRight[0].variant ){ // if 'simon says' is displayed, the button must be clicked, otherwise reset
                console.log('Button clicked!');
                
            let color = button.id;
            let fruit = button.id;
            let wordButton = button.id;
            if(color === currentColor) {
                console.log(currentColor);
                stopTimer();
                isAttemptPassed = true;
                isAttemptSuccessful();
            }

            else if (fruit === currentFruit) {
                console.log(currentFruit);
                stopTimer();
                isAttemptPassed = true;
                isAttemptSuccessful();
            }
            else if (wordButton === 'submitWrite'){
                    console.log('Current word', currentWord);
                    console.log(inputWrite.value);
                    if (inputWrite.value === currentWord){
                    
                    stopTimer();
                    isAttemptPassed = true;
                    isAttemptSuccessful();
                    }
                else {
                    stopTimer();
            isAttemptPassed = false;
            isAttemptSuccessful();
                }
            }
            else {
                stopTimer();
            isAttemptPassed = false;
            isAttemptSuccessful();
            }
            

        }
        else {
            stopTimer();
            isAttemptPassed = false;
            isAttemptSuccessful();
        }
        
    })
})

playAgainButton.forEach(button => {
    button.addEventListener('click', () => {
            console.log("play again clicked");
    gameLostModal.style.display = "none";
    gameWonModal.style.display = "none";
    resetGame();
    })
})


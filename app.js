let min = 1,
    max = 10,
    winningNum = 2;
    guessLeft = 3;

const game = document.getElementById("game");
const minNum = document.querySelector(".min-num");
const maxNum = document.querySelector(".max-num");
const guessBtn = document.querySelector("#guess-btn");
const guessInput = document.querySelector("#guess-input");
const message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

generateWinningNumber();

guessBtn.addEventListener("click", function () {
    if (guessBtn.value !== 'Submit') {
        resetGame();
    } else {
        playTheGame();
    }
});


function generateWinningNumber(){
    winningNum = Math.round(Math.random()*10 + 1);
}

function playTheGame() {
    let guess = parseInt(guessInput.value);

    //Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, "red");
    } else {
        if (winningNum === guess) {
            gameWon(true);
        } else {
            guessLeft -= 1;
            if (guessLeft === 0) {
                gameWon(false);
            } else {
                setMessage(`That's not right. You have ${guessLeft} guesses left. Try again!`, "red");
            }
        }
    }
}

function resetGame(){
    guessBtn.value = 'Submit';
    guessInput.disabled = false;
    guessInput.value = '';
    guessInput.style.borderColor = '';
    guessLeft = 3;
    message.textContent = '';
    generateWinningNumber();
}


function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

function gameWon(status){
    let colour;
    if (status === true){
        colour = 'green';
        setMessage(
            `Congratulations, you guessed correctly. The number was ${winningNum}`,
            "green"
        );
    } else{
        setMessage(`You lost, the number I was thinking of was ${winningNum}. Try again!`);
        colour = 'red';
    }
    guessInput.disabled = true;
    guessInput.style.borderColor = colour;
    guessBtn.value = 'Play a new Game';
}
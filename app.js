/*GAME FUNTIONS:
- Player must guess a number between a min and max
- Player gets a cetain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if losse
- Let player choos to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
    console.log(winningNum);

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play Again Event Listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again')
    {
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    //console.log(guess); // This will give a string. So we will have to convert it to int

    if(isNaN(guess) || guess < min || guess > max)
    {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //Check if won
    if(guess === winningNum)
    {
        //Game Over-WON
        gameOver(true, `${winningNum} is correct!, YOU WIN!`);
    }
    else
    {
        //Wrong number
        guessesLeft--;

        if(guessesLeft === 0)
        {
            //Game Over-LOST
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
        }
        else
        {
            //Game Continues-ANSWER WRONG
            //Change border color
            guessInput.style.borderColor = 'red';

            //Clear input
            guessInput.value = '';  

            //Tell user its wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');

        }
    }

});

//setMessage()
function setMessage(msg, color)
{
    message.style.color = color;
    message.textContent = msg;
}

function gameOver(won, msg)
{  
    let color = won ? 'green' : 'red';     
    //Disable input. If they win they can't enter anymore number
    guessInput.disabled = true;

    //Change the border to green
    guessInput.style.borderColor = color;

    setMessage(msg, color);

    //Set message that they won
    setMessage(msg);

    //Play Again ?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Get winning number
function getRandomNum(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}
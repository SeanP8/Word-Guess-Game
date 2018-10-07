// Grab reference to DOM elements $(means dom element)
var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');

// Create variable for game (wordbank, wins, losses, picked word, guesses left, game running, picked word placeholder, guessed letter bank, incorrect letter bank)
var wordBank = ['Redpill','Bluepill', 'Neo', 'Morpheus','Trinity', 'AgentSmith','TheOracle'];
var wins = 0;
var losses = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

// newGame function to reset all stats, pick new word and create placeholders
function newGame () {

    // reset's game info
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];

    // choose new word
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // create placeholder of new picked word
    for (var i = 0; i < pickedWord.length; i++){
        if (pickedWord[i] ===' ') {
            pickedWordPlaceholderArr.push(' ');
        } else {
            pickedWordPlaceholderArr.push('_');
        }
    }

    // Write new game info to the DOM
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join('');
    $guessedLetters.textContent = incorrectLetterBank;
}


// letterGuess function, takes in the letter they pressed and sees if it's in the selected word
function letterGuess (letter){
    console.log(letter);

    if(gameRunning === true && guessedLetterBank.indexOf(letter) === -1){
        //Run Game
        guessedLetterBank.push(letter);

        // Check if guessed letter is in picked word
        for (var i = 0; i < pickedWord.length; i++){
            // Convert both values to lower case so i can compare them correctly 
            if(pickedWord[i].toLowerCase() === letter.toLowerCase()){
                // if they match, swap out that chatacter in the placeholder with the actual letter
                pickedWordPlaceholderArr[i] = pickedWord[i];
            }
        }


        $placeholders.textContent = pickedWordPlaceholderArr.join ('');
        //pass letter into checkIncorrect function
        checkIncorrect(letter);
    }
    else {
        if(!gameRunning){
           alert ("The game isn't running, click on the New Game Button to start over");
        } else {
            alert("You've already guessed this letter, try a new one!");
        }
    }
}
// checkIncorrect(letter)
    function checkIncorrect(letter) {
        
        //Check to see if letter DIDN'T make it into the pickedWordPlaceHolder, therefore incorrect guess

        if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1
            &&
            pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1 ) {
            // decrement guesses
            guessesLeft --;
            // Add incorrect letter to incorrectLetterBank
            incorrectLetterBank.push(letter);
            //Write new bank of Incorrect letters guessed to DOM
            $guessedLetters.textContent = incorrectLetterBank.join('');
            //Write new amount of guesses left to DOM
            $guessesLeft.textContent = guessesLeft;
        }
        checkLoss();
    }

// checkLoss
function checkLoss (){
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = pickedWord;
    }

    checkWin();
}

// checkWin
function checkWin(){
    if (pickedWord.toLowerCase() ===pickedWordPlaceholderArr.join ('').toLowerCase())
    {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
    }
}

// Add event listen for new game button
$newGameButton.addEventListener('click', newGame);


// add onkeyup event to trigger letterGuess
document.onkeyup = function(event) {
    //console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90){
        letterGuess(event.key);
    }
}
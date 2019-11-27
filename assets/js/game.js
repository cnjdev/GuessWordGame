
// rules for the games
var gameRules = {
	maxMisses: 8,
	validLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
};

// win-loss record
var userRecord = {
	wins: 0,
 	losses: 0
};

// current game variables
var currentGame = {
	item: null,
	word: "",
	misses: 0,
	guesses: [],
	// set new game
	reset: function(){
		this.item = pickGame();
		this.word = this.item.title.toUpperCase();
		this.misses = 0;
		this.guesses = [];
	}
};

var letterClick = false;

function replaceContent(elementId, elementHtml){
	$("#"+elementId).html(elementHtml);
}

// write record of Wins and Losses 
function writeWinLossRecord(){
	var winLossRecord = "Record: " + userRecord.wins + " - " + userRecord.losses;
	replaceContent("winLossRecord", winLossRecord);
}

// get word with guessed letters and blanks for letters not guessed
function getWordWithGuesses(){
	var wordWithGuesses = [];
	for (var i=0; i<currentGame.word.length; i++){
		var wordLetter = currentGame.word.charAt(i);
		if (wordLetter === " "){
			wordWithGuesses.push("<br/>");
			continue;
		}
		var letterGuessed = (currentGame.guesses.indexOf(wordLetter) != -1);
		if (letterGuessed){
			wordWithGuesses.push(wordLetter);	
		} else {
			wordWithGuesses.push("_");
		}
	}
	return wordWithGuesses;
}

// write word with guessed letters and blanks for letters not guessed
function writeWordWithGuesses(){
	var wordWithGuesses = getWordWithGuesses();
	replaceContent("wordWithGuesses", wordWithGuesses.join(" "));
}

// write letters guessed and # guesses left
function writeGuesses(){
	var guessesLeft = (gameRules.maxMisses - currentGame.misses);
	replaceContent("guessedLetters", currentGame.guesses.join(", "));
	replaceContent("guessesRemaining", guessesLeft);
}

// write available letters
function writeAvailableLetters(){
	var letters = gameRules.validLetters;
	var numLetters = letters.length;
	var halfCount = Math.floor(numLetters / 2);

	$("#availableLetters").empty();
	for (var i=0; i<numLetters; i++){
		var letterLink = $("<a>");
		letterLink.html(letters[i]);
		letterLink.attr("href", "#");
		letterLink.attr("data-letter", letters[i]);
		letterLink.addClass("availLetter");
		$("#availableLetters").append(letterLink);
	}
}

// start the game
function startGame(){
	currentGame.reset();

	writeWinLossRecord();
	writeWordWithGuesses();
	writeGuesses();
	writeAvailableLetters();
}

function writeItemInfo(){
	replaceContent("itemInfo", currentGame.item.getInfo());
}

// write game result, item information, and restart the game
function startOver(gameResult){
	replaceContent("gameResult", gameResult);
	console.log(gameResult);

	writeItemInfo();

	startGame();
}

// user won
function winGame(){
	userRecord.wins++;

	document.getElementById("youWinSound").play();

	var gameResult = 	"You win! The item was: " + currentGame.word;
	startOver(gameResult);
}

// user lost
function loseGame(){
	userRecord.losses++;

	document.getElementById("youLoseSound").play();

	var gameResult = 	"Sorry, you lose. The item was: " + currentGame.word;
	startOver(gameResult);
}

// check the current word for the letter guessed
function checkWordForLetter(wordLetter){
	// if letter already guessed, return
	if (currentGame.guesses.indexOf(wordLetter) != -1)
		return;

	// add letter to guesses
	currentGame.guesses.push(wordLetter);
	console.log("Letter Guessed: " + wordLetter);

	// check word for letter guessed
	var wordHasLetter = (currentGame.word.indexOf(wordLetter) != -1);
	// if guess is incorrect, add to misses
	if (!wordHasLetter) 
		currentGame.misses++;

	// write letters guessed, # guesses remaining, and word with guesses
	writeGuesses();
	writeWordWithGuesses();
	
	// if there are no more blanks, game is won
	var wordWithGuesses = getWordWithGuesses();
	if (wordWithGuesses.indexOf("_") == -1)
		winGame();

	// if user maxed out their guesses, game is lost
	if (currentGame.misses >= gameRules.maxMisses)
		loseGame(); 
}

function guessLetter(letter){
	$("[data-letter='"+letter+"']").remove();

	checkWordForLetter(letter);
}

// start the game on load and set the listener
$(document).ready(function(){
	startGame();
});

$(document).on('click tap', '.availLetter', function(event) {
	event.preventDefault();
	console.log(event.target);
  var clickLetter = $(this).data("letter");
	guessLetter(clickLetter);
});

document.onkeyup = function(event){
	var userGuess = event.key.toUpperCase();

	if (gameRules.validLetters.indexOf(userGuess) == -1)
		return;

	guessLetter(userGuess);
};
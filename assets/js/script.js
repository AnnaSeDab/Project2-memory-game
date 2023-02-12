let score = 0;
let lives = 3;
let maxSquares = 4;
let arr = [];
let arrPicked = [];

/* loading play button into variable and giving it event listener */
let playButton = document.getElementById("start-btn");
playButton.addEventListener("click", playGame);

/* loading check button into variable and giving it event listener 
setting its initial state */
let checkButton = document.getElementById('check-btn');
checkButton.style.backgroundColor = "grey";
checkButton.disabled = true;
checkButton.addEventListener("click", checkAnswer);

/* loading score into a variable */
let currentScore = document.getElementById("score-no");

/* function run after play button pressed
first it checks if we just lost the game in which would reset the game 
changes appearance of buttons
runs function to pick and light up tiles
at certain level runs function to pick monkey tile*/
function playGame() {

	if (lives === 0) {
		playAgain();
	}

	playButton.innerHTML = 'Next';

	playButton.disabled = true;
	playButton.style.backgroundColor = "grey";

	setRandomTiles();

	if (maxSquares > 8) {
		setMonkeyTile();
	}
}

/* function disables play button
lghts up tiles but seleting random number which is then checked with part of the tile's id
until it reaches number of tiles needed for the level
time out function turns off the tiles, enables check button and clicking on tiles
*/
function setRandomTiles() {
	playButton.disabled = true;
	checkButton.innerHTML = "Check answer";

	arr = [];
	let counter = 0;
	while (counter < maxSquares) {
		let boxIndex = getRandomBox();
		arr.push(boxIndex);
		let boxElement = document.getElementById(`tile-${boxIndex}`);
		boxElement.className = "lit-tile";
		counter++;
	}
  setTimeout(() => {
    for (let y = 0; y < 25; y++) {
      let classBox = document.getElementById(`tile-${y}`);

      classBox.className = "grid-item pickable";

      document.getElementById('check-btn').disabled = false;
      document.getElementById('check-btn').style.backgroundColor = "#191B10";

      document.body.addEventListener('click', function(evt) {
        if (evt.target.classList.contains("pickable")) {
          let whichTileClicked = evt.target.id;
          document.getElementById(whichTileClicked).classList.add("lit-tile");
        }
      }, false);
    }
  }, 2000);
}

/** function sets monkey tile and then turnes it off after time out */
function setMonkeyTile() {
	let monkeyTileIndex = getRandomBox();
	let monkey = document.getElementById(`tile-${monkeyTileIndex}`);
	monkey.className = "monkey-picture";
	setTimeout
		(() => {
			monkey.className = "grid-item pickable";
		}, 2000);
}

/**function picks a random number and checks against arr array*/
function getRandomBox() {
	let randNum = Math.floor(Math.random() * (25));
	if (arr.includes(randNum)) {
		return getRandomBox();
	}
	return randNum;
}

/**function checks if the last level was won
 * if yes it modifies buttons and activates functions: 
 * playAgain(resseting variables) resetGrid(resetting the grid)
 * if not 
 */
function checkAnswer() {
	if (maxSquares === 15) {
		checkButton.innerHTML = `You won! Your score is:  ${score}`;
		playButton.innerHTML = "Play again";
		playButton.style.backgroundColor = "#191B10";
		playButton.disabled = false;
		checkButton.disabled = true;
		playAgain();
		resetGrid();
	} else {
    arrPicked = [];
		let pickedTiles = document.getElementsByClassName("lit-tile");
		for (let i = 0; i < pickedTiles.length; i++) {
			let idOfPicked = pickedTiles[i].id;
			let indexOfPicked = idOfPicked.split("-");
			let indexAsNumber = parseInt(indexOfPicked[1]);
			arrPicked.push(indexAsNumber);
		}
		arr.sort(function(a, b) {
			return a - b;
		});
		if (arrayEquals(arr, arrPicked)) {
			score++;
			currentScore.innerHTML = score;
			checkButton.innerHTML = "That's right!";
			maxSquares++;
		} else {
			checkButton.innerHTML = "Wrong answer!";
			looseLife();
		}
		checkButton.disabled = true;
		checkButton.style.backgroundColor = "grey";
		playButton.disabled = false;
		playButton.style.backgroundColor = "#191B10";

		resetGrid();
	}
}

function arrayEquals(a, b) {
	return Array.isArray(a) &&
		Array.isArray(b) &&
		a.length === b.length &&
		a.every((val, index) => val === b[index]);
}

function looseLife() {
	if (lives === 3) {
		document.getElementById('star-one').style.visibility = 'hidden';
		lives = lives - 1;
	} else if (lives === 2) {
		document.getElementById('star-two').style.visibility = 'hidden';
		lives = lives - 1;
	} else if (lives === 1) {
		document.getElementById('star-three').style.visibility = 'hidden';
		checkButton.innerHTML = `You lost! Your score is: ${score}`;
		playButton.innerHTML = "Play again";
		lives = lives - 1;
	}
}

function playAgain() {
	score = 0;
	currentScore.innerHTML = score;
	lives = 3;
	maxSquares = 4;
	document.getElementById('star-one').style.visibility = 'visible';
	document.getElementById('star-two').style.visibility = 'visible';
	document.getElementById('star-three').style.visibility = 'visible';
}

function resetGrid() {
	for (let y = 0; y < 25; y++) {
		let classBox = document.getElementById(`tile-${y}`);
		classBox.className = "grid-item";
	}
}
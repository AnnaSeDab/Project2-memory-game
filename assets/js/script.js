let gridSize = 24;
let score = 0;
let lives = 3;
let tilesClicked = 0;
let userName;
let maxSquares = 4;
let arr = [];
let arrPicked = [];

let playButton = document.getElementById("start-btn");
playButton.addEventListener("click", playGame);

let checkButton = document.getElementById('check-btn');
checkButton.style.backgroundColor = "grey";
checkButton.disabled = true;
checkButton.addEventListener("click", checkAnswer);

let gameContainer = document.getElementById("game-container");

let currentScore = document.getElementById("score-no");

function playGame() {

    if(lives === 0){
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

function setRandomTiles() {
    playButton.disabled = true;
    checkButton.innerHTML = "Check answer";

    arr = [];
    arrPicked = [];
    let counter = 0;
    while (counter < maxSquares) {
        let boxIndex = getRandomBox();
        arr.push(boxIndex);
        let boxElement = document.getElementById(`tile-${boxIndex}`);
        boxElement.className = "lit-tile";
        setTimeout(() => {
            for (let y = 0; y < 25; y++) {
                let classBox = document.getElementById(`tile-${y}`);

                classBox.className = "grid-item pickable";

                checkButton.disabled = false;
                checkButton.style.backgroundColor = "#191B10";

                document.body.addEventListener('click', function(evt) {
                    if (evt.target.classList.contains("pickable")) {
                        let whichTileClicked = evt.target.id;
                        document.getElementById(whichTileClicked).classList.add("lit-tile")
                    }
                }, false);
            }
        }, 2000)
        counter++;
    }
}

function setMonkeyTile() {
    let monkeyTileIndex = getRandomBox();
    let monkey = document.getElementById(`tile-${monkeyTileIndex}`);
    monkey.className = "monkey-picture";
    setTimeout
        (() => {
            monkey.className = "grid-item pickable";
        }, 2000)
}

function getRandomBox() {
    const allClassBoxes = document.getElementsByClassName("lit-tile");
    let randNum = Math.floor(Math.random() * (gridSize + 1));
    if (arr.includes(randNum)) {
        return getRandomBox();
    }
    return randNum
}

function checkAnswer() {
  if (maxSquares === 15) {
    checkButton.innerHTML = `You won! Your score is:  ${score}`;
    playButton.innerHTML = "Play again";
    playButton.style.backgroundColor = "#191B10";
    playButton.disabled = false;
    checkButton.disabled = true;
    playAgain();
    resetGrid();
    return;
}else{
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
        maxSquares++  
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

function playAgain(){
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
        classBox.className = "grid-item"
    }
}
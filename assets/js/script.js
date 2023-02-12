/*disable printscreen posibility*/

let level = 0;
let gridSize = 24;
let squaresLight = 2;
let score = 0;
let lives = 3;
let tilesClicked = 0;
let userName;
let tilesPickedIndex = [];
let addToGrid = 3;
let numberOfColumns = "auto auto";
let gameContainer;
let maxSquares = 4;
let arr = [];
let arrPicked = [];
/*listener on loading the page

set how many squares to light up
pick tiles to light up */

/*listener press play
    activate play function
        generate grid from variables DONE
        populate grid with squares DONE
        set how many squares to light up Done
        pick tiles to light up
        hide the play button
        show timer
        light up squares
        count to 3 
        hide squares*/
        
let playButton = document.getElementById("start-btn");
playButton.addEventListener("click", playGame);

let checkButton = document.getElementById('check-btn');
checkButton.style.visibility = 'hidden';
checkButton.addEventListener("click", checkAnswer);


function playGame(){
    
    let rightAnswers = 0;

    document.getElementById('start-btn').style.visibility = 'hidden';
    document.getElementById('check-btn').style.visibility = 'visible';

    setRandomTiles();

    if (level > 1){
      setMonkeyTile();
    }

    document.body.addEventListener('click', function (evt) {
        if(evt.target.classList.contains("pickable")){
            let whichTileClicked = evt.target.id;
            document.getElementById(whichTileClicked).classList.add("lit-tile")} 
    }, false);
} 

function setRandomTiles() {
	playButton.disabled = true;

  if (level === 20) {
    console.log('Game is over');
    return;
  }

  arr = [];
  arrPicked = [];
  let counter = 0;
  while (counter < maxSquares) {
    let boxIndex = getRandomBox();
    arr.push(boxIndex);
    console.log(`Add this to arrays: ${boxIndex}, and the array now contains: ${arr}`)
    let boxElement = document.getElementById(`tile-${boxIndex}`);
    boxElement.className = "lit-tile";
    setTimeout(() => {
      for (let y = 0; y < arr.length + 1; y++) {
        let classBox = document.getElementById(`tile-${arr[y]}`);
        if (classBox && classBox.classList.contains("lit-tile")) {
          classBox.className = "grid-item pickable";
          playButton.disabled = false;
        }
      }
    }, 3000)
    counter++;
  }

  maxSquares++
  console.log(`Max squares: ${maxSquares}`)
}

function setMonkeyTile(){
    let monkeyTileIndex = getRandomBox();
    console.log(`monkey index: ${monkeyTileIndex}`)
    let monkey = document.getElementById(`tile-${monkeyTileIndex}`);
    monkey.className = "monkey-picture";
    setTimeout
    (() => {
    monkey.className = "grid-item pickable";
    }, 3000)
}

function getRandomBox() {
    const allClassBoxes = document.getElementsByClassName("lit-tile");
    console.log(`All class length inside get random: ${allClassBoxes.length}`);
    let randNum = Math.floor(Math.random() * (gridSize + 1));
    console.log(`Rand num: ${randNum}`)
    if (arr.includes(randNum)) {
      return getRandomBox();
    }
    return randNum
  }
  
function checkAnswer(){
  let pickedTiles =  document.getElementsByClassName("lit-tile");
  for (let i = 0; i < pickedTiles.length; i++) {
    let idOfPicked = pickedTiles[i].id;
    let indexOfPicked = idOfPicked.split("-");
    let indexAsNumber = parseInt(indexOfPicked[1]);
    arrPicked.push(indexAsNumber);
  }
  arr.sort(function(a, b) {
    return a - b;
  });
  if(arrayEquals(arr, arrPicked)){
    score++;
    level++;
    console.log(`current level: ${level}`);
    let currentScore = document.getElementById("score-no");
    currentScore.innerHTML = score;
    alert("Good Job! Correct answer!")
  } else {
    alert("Wrong answer!")
    looseLife();
  }
  
  document.getElementById('start-btn').style.visibility = 'visible';
  document.getElementById('check-btn').style.visibility = 'hidden';

  resetGrid();
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
        alert("You lost!");
    }
}

function resetGrid(){
  for (let y = 0; y < arr.length + 1; y++) {
    let classBox = document.getElementById(`tile-${arr[y]}`);
    if (classBox && classBox.classList.contains("lit-tile")) {
      classBox.className = "grid-item pickable"
    }
  }
}

/*listener click on tile
check if tile clicked is right
if yes
    add 1 to tiles clicked
    disable clicking on that tile 
    check if tiles clicked equals tiles 
        if yes activate levelcomplete function
else activate fail function
    check lives variable 
        if more than 1
            take away life star which one depend on variable
            pop up failure alert
            activate play function
        else game over  
            pop up game over alert  
    */

/*level complete function
    add score
    add level
    add to grid if level % 3
    add square
    activate play function
    */


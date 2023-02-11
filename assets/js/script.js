/*disable printscreen posibility*/


let gridSize = 4;
let squaresLight = 2;
let score = 0;
let lives = 3;
let tilesClicked = 0;
let userName;
let tilesPickedIndex = [];
let addToGrid = 3;
let numberOfColumns = "auto auto";
let gameContainer;

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

function playGame(){
    addToGrid = addToGrid + 2;
    gridSize = gridSize + addToGrid;

    let tileIndex = Math.floor(Math.random() * (gridSize + 1));

    numberOfColumns =  numberOfColumns.concat(" auto");
    document.getElementById('game-container').style.gridTemplateColumns = numberOfColumns;


    let gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = '';
    for (var i=0; i<gridSize; i++){
        gameContainer.innerHTML = gameContainer.innerHTML + " <div class='grid-item'></div>";
    }

    if (squaresLight < gridSize){
        squaresLight++
        assignLitTiles(tileIndex);   
    }

    setTimeout(timeOut, 1000);

    document.getElementById('start-btn').style.visibility = 'hidden';

    document.getElementById("right").addEventListener("click",function rightAnswer() {
        alert("Hello world!");
    });


    /* basically copypasted so credit https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class*/

    document.body.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('wrong')) {
            alert("wrong!");
        }
    }, false);
} 

function assignLitTiles(i){   
        let allTiles = document.getElementsByClassName("grid-item");
        allTiles[i].classList.toggle("lit-tile");
        allTiles[i].id = "right";
        for (let f of allTiles){
            f.classList.add("wrong");
        }
}

function timeOut(){
    let litTile = document.getElementsByClassName("lit-tile");
    litTile[0].classList = "grid-item";
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


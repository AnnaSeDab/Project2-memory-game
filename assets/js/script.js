/*disable printscreen posibility*/


let gridSize = 9;
let squaresLight = 2;
let score = 0;
let lives = 3;
let tilesClicked = 0;
let userName;
let tilesPickedIndex = [];

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
    let gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = '';
    for (var i=0; i<gridSize; i++){
        gameContainer.innerHTML = gameContainer.innerHTML + " <div class='grid-item'></div>";
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

